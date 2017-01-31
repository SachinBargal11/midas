import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import { User } from '../../../commons/models/user';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'add-patient',
    templateUrl: './add-patient.html'
})

export class AddPatientComponent implements OnInit {
    minDate: Date;
    maxDate: Date;
    patientform: FormGroup;
    patientformControls;

    isSavePatientProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _patientsStore: PatientsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this.patientform = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            mobileNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            address: [''],
            dob: ['', Validators.required]
        });
        this.patientformControls = this.patientform.controls;

    }

    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
    }


    savePatient() {
        this.isSavePatientProgress = true;
        let result;
        let patient = new Patient({
            user: new User({
                firstname: this.patientform.value.firstname,
                lastname: this.patientform.value.lastname,
                email: this.patientform.value.email,
                // mobileNo: this.patientform.value.mobileNo,
                // address: this.patientform.value.address,
                // dob: this.patientform.value.dob,
            })
        });
        this._progressBarService.show();
        result = this._patientsStore.addPatient(patient);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/patient-manager/patients']);
            },
            (error) => {
                let errString = 'Unable to add patient.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSavePatientProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSavePatientProgress = false;
                this._progressBarService.hide();
            });

    }

}