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
import { Insurance } from '../../patients/models/insurance';
import { InsuranceMaster } from '../../patients/models/insurance-master';
import { InsuranceStore } from '../../patients/stores/insurance-store';
import { PatientsStore } from '../../patients/stores/patients-store';
@Component({
    selector: 'add-insurance',
    templateUrl: './add-insurance.html'
})


export class AddInsuranceComponent implements OnInit {
    states: any[];
    insuranceMasters: InsuranceMaster[];
    insuranceMaster: InsuranceMaster;
    insuranceMastersAdress: Address;
    policyCities: any[];
    insuranceCities: any[];
    caseId: number;
    selectedCity = 0;
    isPolicyCitiesLoading = false;
    isInsuranceCitiesLoading = false;

    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        public sessionStore: SessionStore,
        private _insuranceStore: InsuranceStore,
        private _patientsStore: PatientsStore,
        private _elRef: ElementRef
    ) {
        //  this.patientId = this.sessionStore.session.user.id;
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
        //  this._insuranceStore.getInsurancesMaster()
        //     .subscribe(
        //     (insuranceMasters) => {
        //         this.insuranceMasters = insuranceMasters;
        //         this.insuranceMasters.forEach(element => {
        //             this.insuranceMastersAdress = element.Address
        //         });
        //     });


        this.insuranceform = this.fb.group({
            policyNumber: ['', Validators.required],
            policyOwner: ['', Validators.required],
            policyHolderName: ['', Validators.required],
            insuranceCompanyCode: [''],
            insuranceMasterId: ['', Validators.required],
            insuranceType: ['', Validators.required],
            contactPerson: ['', Validators.required],
            policyAddress: ['', Validators.required],
            policyAddress2: [''],
            policyState: [''],
            policyCity: [''],
            policyZipcode: [''],
            policyCountry: [''],
            policyEmail: ['', [Validators.required, AppValidators.emailValidator]],
            policyCellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            policyHomePhone: [''],
            policyWorkPhone: [''],
            policyFaxNo: [''],
            address: [''],
            address2: [''],
            state: [''],
            city: [''],
            zipcode: [''],
            country: [''],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            homePhone: [''],
            workPhone: [''],
            faxNo: ['']
        });

        this.insuranceformControls = this.insuranceform.controls;
    }
    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
        this._insuranceStore.getInsurancesMaster(this.caseId)
            .subscribe(insuranceMasters => this.insuranceMasters = insuranceMasters);
    }

    selectInsurance(event) {
        let currentInsurance: number = parseInt(event.target.value);
        this.loadInsuranceMasterAddress(currentInsurance);
    }

    loadInsuranceMasterAddress(currentInsurance) {
        if (currentInsurance) {
            this._insuranceStore.getInsuranceMasterById(currentInsurance)
                .subscribe(
                (insuranceMaster) => {
                    this.insuranceMaster = insuranceMaster;
                    this.insuranceMastersAdress = insuranceMaster.Address;
                });
        } else {
            this.insuranceMaster = null;
            this.insuranceMastersAdress = null;
        }
    }

    save() {
        this.isSaveProgress = true;
        let insuranceformValues = this.insuranceform.value;
        let result;
        let insurance = new Insurance({
            caseId: this.caseId,
            policyHoldersName: insuranceformValues.policyHolderName,
            policyOwnerId: insuranceformValues.policyOwner,
            policyNo: insuranceformValues.policyNumber,
            insuranceCompanyCode: insuranceformValues.insuranceCompanyCode,
            contactPerson: insuranceformValues.contactPerson,
            insuranceType: insuranceformValues.insuranceType,
            insuranceMasterId: insuranceformValues.insuranceMasterId,
            policyContact: new Contact({
                cellPhone: insuranceformValues.policyCellPhone ? insuranceformValues.policyCellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.policyEmail,
                faxNo: insuranceformValues.policyFaxNo ? insuranceformValues.policyFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.policyHomePhone,
                workPhone: insuranceformValues.policyWorkPhone
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
                cellPhone: insuranceformValues.policyCellPhone ? insuranceformValues.policyCellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.policyEmail,
                faxNo: insuranceformValues.policyFaxNo ? insuranceformValues.policyFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.policyHomePhone,
                workPhone: insuranceformValues.policyWorkPhone
            }),
            insuranceAddress: new Address({
                address1: insuranceformValues.address,
                address2: insuranceformValues.address2,
                city: insuranceformValues.city,
                country: insuranceformValues.country,
                state: insuranceformValues.state,
                zipCode: insuranceformValues.zipCode
            })
        });
        this.progressBarService.show();
        result = this._insuranceStore.addInsurance(insurance);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add insurance.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this.notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this.progressBarService.hide();
            });
    }
}
