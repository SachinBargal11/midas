import { Patient } from '../models/patient';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { PatientsStore } from '../stores/patients-store';
import { AppValidators } from '../../commons/utils/AppValidators';
import * as moment from 'moment';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../commons/models/notification';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { User } from '../../commons/models/user';
import * as _ from 'underscore';

@Component({
    selector: 'basic',
    templateUrl: './patient-basic.html'
})

export class PatientBasicComponent implements OnInit {
    patientId: number;
    patientInfo: Patient;
    dateOfBirth: Date;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    basicform: FormGroup;
    basicformControls;
    isSavePatientProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
       public notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _patientsStore: PatientsStore
    ) {
        this._route.parent.params.subscribe((params: any) => {
            // this.patientId = parseInt(params.patientId, 10);
            this.progressBarService.show();
            this.patientId = this.sessionStore.session.user.id;
            let result = this._patientsStore.getPatientById(this.patientId);
            result.subscribe(
                (patient: Patient) => {
                    this.patientInfo = patient;
                    this.dateOfBirth = this.patientInfo.user.dateOfBirth
                        ? this.patientInfo.user.dateOfBirth.toDate()
                        : null;
                },
                (error) => {
                    this._router.navigate(['/dashboard']);
                    this.progressBarService.hide();
                },
                () => {
                    this.progressBarService.hide();
                });

        });
        this.basicform = this.fb.group({
            dob: [''],
            firstname: ['', Validators.required],
            middlename: [''],
            lastname: ['', Validators.required],
            gender: ['', Validators.required],
            maritalStatusId: ['', Validators.required]
        });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    savePatient() {
        this.isSavePatientProgress = true;
        let basicFormValues = this.basicform.value;
        let result;
        let existingPatientJS = this.patientInfo.toJS();
        let patient = new Patient(_.extend(existingPatientJS, {
            maritalStatusId: basicFormValues.maritalStatusId,
            updateByUserId: this.sessionStore.session.account.user.id,
            user: new User(_.extend(existingPatientJS.user, {
                dateOfBirth: basicFormValues.dob ? moment(basicFormValues.dob) : null,
                firstName: basicFormValues.firstname,
                middleName: basicFormValues.middlename,
                lastName: basicFormValues.lastname,
                updateByUserId: this.sessionStore.session.account.user.id,
                gender: basicFormValues.gender
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
                this._router.navigate(['/dashboard']);
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
