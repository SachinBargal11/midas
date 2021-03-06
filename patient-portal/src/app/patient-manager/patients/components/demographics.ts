import { PatientAdapter } from '../services/adapters/patient-adapter';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { User } from '../../../commons/models/user';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import { StatesStore } from '../../../commons/stores/states-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';

@Component({
    selector: 'demographics',
    templateUrl: './demographics.html'
})

export class DemographicsComponent implements OnInit {
    emergencyContactCellPhone: string;
    emergencyContactPerson: string;
    cellPhone: string;
    faxNo: string;
    patientId: number;
    patientInfo: Patient;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    demographicsform: FormGroup;
    demographicsformControls;
    isSavePatientProgress = false;
    selectedCity = 0;
    isCitiesLoading = false;
    states: any[];
    cities: any[];
    dateOfFirstTreatment: Date;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
       public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        public sessionStore: SessionStore,
        private _patientsStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe
    ) {
        // this._route.parent.params.subscribe((params: any) => {
        //     this.patientId = parseInt(params.patientId, 10);
            this.patientId = this.sessionStore.session.user.id;
            this.progressBarService.show();
            let result = this._patientsStore.getPatientById(this.patientId);
            result.subscribe(
                (patient: Patient) => {
                    this.patientInfo = patient;
                    this.emergencyContactPerson = this.patientInfo.emergencyContactName;
                    this.emergencyContactCellPhone = this.patientInfo.emergencyContactPhone;
                    this.cellPhone = this._phoneFormatPipe.transform(this.patientInfo.user.contact.cellPhone);
                    this.faxNo = this._faxNoFormatPipe.transform(this.patientInfo.user.contact.faxNo);
                    this.dateOfFirstTreatment = this.patientInfo.dateOfFirstTreatment
                        ? this.patientInfo.dateOfFirstTreatment.toDate()
                        : null;
                    // if (this.patientInfo.user.address.state) {
                    //     this.loadCities(this.patientInfo.user.address.state);
                    // }
                },
                (error) => {
                    // this._router.navigate(['/patient-manager/profile/viewall']);
                    this.progressBarService.hide();
                },
                () => {
                    this.progressBarService.hide();
                });

        // });
        this.demographicsform = this.fb.group({
            userInfo: this.fb.group({
                ssn: ['', Validators.required],
                weight: [''],
                height: [''],
                dateOfFirstTreatment: ['']
            }),
            contact: this.fb.group({
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: [''],
                emergencyContactPerson: [''],
                emergencyContactCellPhone: ['']
            }),
            address: this.fb.group({
                address1: [''],
                address2: [''],
                city: [''],
                zipCode: [''],
                state: [''],
                country: ['']
            })
        });

        this.demographicsformControls = this.demographicsform.controls;
    }

    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    savePatient() {
        this.isSavePatientProgress = true;
        let demographicsFormValues = this.demographicsform.value;
        let result;
        let existingPatientJS = this.patientInfo.toJS();
        let patient = new Patient(_.extend(existingPatientJS, {
            ssn: demographicsFormValues.userInfo.ssn,
            weight: parseInt(demographicsFormValues.userInfo.weight, 10),
            height: parseInt(demographicsFormValues.userInfo.height, 10),
            dateOfFirstTreatment: demographicsFormValues.userInfo.dateOfFirstTreatment ? moment(demographicsFormValues.userInfo.dateOfFirstTreatment) : null,
            updateByUserId: this.sessionStore.session.account.user.id,
            emergencyContactName:demographicsFormValues.contact.emergencyContactPerson,
            emergencyContactPhone:demographicsFormValues.contact.emergencyContactCellPhone,
            user: new User(_.extend(existingPatientJS.user, {
                updateByUserId: this.sessionStore.session.account.user.id,
                contact: new Contact(_.extend(existingPatientJS.user.contact, {
                    cellPhone: demographicsFormValues.contact.cellPhone ? demographicsFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                    faxNo: demographicsFormValues.contact.faxNo ? demographicsFormValues.contact.faxNo.replace(/\-|\s/g, '') : '',
                    homePhone: demographicsFormValues.contact.homePhone,
                    workPhone: demographicsFormValues.contact.workPhone,
                    updateByUserId: this.sessionStore.session.account.user.id
                })),
                address: new Address(_.extend(existingPatientJS.user.address, {
                    address1: demographicsFormValues.address.address1,
                    address2: demographicsFormValues.address.address2,
                    city: demographicsFormValues.address.city,
                    country: demographicsFormValues.address.country,
                    state: demographicsFormValues.address.state,
                    zipCode: demographicsFormValues.address.zipCode,
                    updateByUserId: this.sessionStore.session.account.user.id
                }))
            }))
        }));
        this.progressBarService.show();
        result = this._patientsStore.updatePatient(patient);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.notificationsStore.addNotification(notification);
                this._router.navigate(['/patient-manager/profile/viewall']);
            },
            (error) => {
                let errString = 'Unable to update patient.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSavePatientProgress = false;
                this.notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.progressBarService.hide();
            },
            () => {
                this.isSavePatientProgress = false;
                this.progressBarService.hide();
            });
    }

}
