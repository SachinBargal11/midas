import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { Insurance } from '../models/insurance';
import { InsuranceMaster } from '../models/insurance-master';
import { InsuranceStore } from '../stores/insurance-store';
import { PatientsStore } from '../stores/patients-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { Case } from '../../cases/models/case';
import { CasesStore } from '../../cases/stores/case-store';

@Component({
    selector: 'edit-insurance',
    templateUrl: './edit-insurance.html'
})


export class EditInsuranceComponent implements OnInit {
    caseDetail: Case[];
    referredToMe: boolean = false;
    insuranceMasters: InsuranceMaster[];
    insuranceMastersAdress: Address;
    insuranceMaster: InsuranceMaster;
    policyCellPhone: string;
    policyFaxNo: string;
    insuranceCellPhone: string;
    insuranceFaxNo: string;
    states: any[];
    policyCities: any[];
    insuranceCities: any[];
    selectedPolicyCity;
    selectedInsuranceCity;
    insurance: Insurance;
    policyAddress = new Address({});
    policyContact = new Contact({});
    insuranceAddress = new Address({});
    insuranceContact = new Contact({});
    patientId: number;
    isPolicyCitiesLoading = false;
    isInsuranceCitiesLoading = false;
    uploadedFiles: any[] = [];

    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _insuranceStore: InsuranceStore,
        private _patientsStore: PatientsStore,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _elRef: ElementRef,
        private _casesStore: CasesStore
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
            this._progressBarService.show();
            let caseResult = this._casesStore.getOpenCaseForPatient(this.patientId);
            caseResult.subscribe(
                (cases: Case[]) => {
                    this.caseDetail = cases;
                    if (this.caseDetail.length > 0) {
                        this.caseDetail[0].referral.forEach(element => {
                            if (element.referredToCompanyId == _sessionStore.session.currentCompany.id) {
                                this.referredToMe = true;
                            } else {
                                this.referredToMe = false;
                            }
                        })
                    } else {
                        this.referredToMe = false;
                    }

                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this._route.params.subscribe((routeParams: any) => {
            let insuranceId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._insuranceStore.fetchInsuranceById(insuranceId);
            result.subscribe(
                (insurance: any) => {
                    this.insurance = insurance.toJS();

                    this.loadInsuranceMasterAddress(this.insurance.insuranceMasterId);
                    this.policyCellPhone = this._phoneFormatPipe.transform(this.insurance.policyContact.cellPhone);
                    this.policyFaxNo = this._faxNoFormatPipe.transform(this.insurance.policyContact.faxNo);
                    this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
                    this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);

                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this.insuranceform = this.fb.group({
            policyNo: ['', Validators.required],
            policyOwner: ['', Validators.required],
            policyHoldersName: ['', Validators.required],
            insuranceCompanyCode: [''],
            insuranceType: ['', Validators.required],
            insuranceMasterId: ['', Validators.required],
            contactPerson: ['', Validators.required],
            policyAddress: ['', Validators.required],
            policyAddress2: [''],
            policyState: [''],
            policyCity: [''],
            policyZipCode: [''],
            policyCountry: [''],
            policyEmail: ['', [Validators.required, AppValidators.emailValidator]],
            policyCellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            policyHomePhone: [''],
            policyWorkPhone: [''],
            policyFaxNo: [''],
            policyOfficeExtension: [''],
            policyAlternateEmail: ['', [AppValidators.emailValidator]],
            policyPreferredCommunication: [''],
            address: [],
            address2: [],
            state: [],
            city: [],
            zipcode: [],
            country: [],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            homePhone: [''],
            workPhone: [''],
            faxNo: [''],
            alternateEmail: ['', [AppValidators.emailValidator]],
            officeExtension: [''],
            preferredCommunication: ['']
        });

        this.insuranceformControls = this.insuranceform.controls;
    }
    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);

        this._insuranceStore.getInsurancesMaster()
            .subscribe(insuranceMasters => this.insuranceMasters = insuranceMasters);

    }

    selectInsurance(event) {
        let currentInsurance: number = parseInt(event.target.value);
        if (currentInsurance !== 0) {
            this.loadInsuranceMasterAddress(currentInsurance);
        } else {
            this.insuranceMastersAdress = null
        }
    }
    onUpload(event) {

        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    loadInsuranceMasterAddress(currentInsurance) {
        this._insuranceStore.getInsuranceMasterById(currentInsurance)
            .subscribe(
            (insuranceMaster) => {
                this.insuranceMaster = insuranceMaster;
                this.insuranceMastersAdress = insuranceMaster.Address
            });
    }
    save() {
        this.isSaveProgress = true;
        let insuranceformValues = this.insuranceform.value;
        let result;
        let insurance = new Insurance({
            id: this.insurance.id,
            patientId: this.patientId,
            policyHoldersName: insuranceformValues.policyHoldersName,
            policyOwnerId: insuranceformValues.policyOwner,
            policyNo: insuranceformValues.policyNo,
            insuranceCompanyCode: insuranceformValues.insuranceCompanyCode,
            contactPerson: insuranceformValues.contactPerson,
            insuranceType: insuranceformValues.insuranceType,
            insuranceMasterId: parseInt(insuranceformValues.insuranceMasterId),
            policyContact: new Contact({
                cellPhone: insuranceformValues.policyCellPhone ? insuranceformValues.policyCellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.policyEmail,
                faxNo: insuranceformValues.policyFaxNo ? insuranceformValues.policyFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.policyHomePhone,
                workPhone: insuranceformValues.policyWorkPhone,
                officeExtension: insuranceformValues.policyOfficeExtension,
                alternateEmail: insuranceformValues.policyAlternateEmail,
                preferredCommunication: insuranceformValues.policyPreferredCommunication,

            }),
            policyAddress: new Address({
                address1: insuranceformValues.policyAddress,
                address2: insuranceformValues.policyAddress2,
                city: insuranceformValues.policyCity,
                country: insuranceformValues.policyCountry,
                state: insuranceformValues.policyState,
                zipCode: insuranceformValues.policyZipCode
            }),
            insuranceContact: new Contact({
                cellPhone: insuranceformValues.cellPhone ? insuranceformValues.cellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.email,
                faxNo: insuranceformValues.faxNo ? insuranceformValues.faxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.homePhone,
                workPhone: insuranceformValues.workPhone,
                officeExtension: insuranceformValues.officeExtension,
                alternateEmail: insuranceformValues.alternateEmail,
                preferredCommunication: insuranceformValues.preferredCommunication,
            }),
            insuranceAddress: new Address({
            })
        });
        this._progressBarService.show();
        result = this._insuranceStore.updateInsurance(insurance);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update Insurance.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }
}
