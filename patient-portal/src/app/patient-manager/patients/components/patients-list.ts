import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'patients-list',
    templateUrl: './patients-list.html'
})

export class PatientsListComponent implements OnInit {
    selectedPatients: Patient[] = [];
    patients: Patient[];
    datasource: Patient[];
    totalRecords: number;

    constructor(
        private _router: Router,
        private _patientsStore: PatientsStore,
       public notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
    ) {
    }

    ngOnInit() {
        this.loadPatients();
    }

    loadPatients() {
        // this.progressBarService.show();
        // this._patientsStore.getPatients()
        //     .subscribe(patients => {
        //         this.patients = patients.reverse();
        //         // this.datasource = patients.reverse();
        //         // this.totalRecords = this.datasource.length;
        //         // this.patients = this.datasource.slice(0, 10);
        //     },
        //     (error) => {
        //         this.progressBarService.hide();
        //     },
        //     () => {
        //         this.progressBarService.hide();
        //     });
    }

    loadPatientsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if(this.datasource) {
                this.patients = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }
    deletePatients() {
        if (this.selectedPatients.length > 0) {
            this.selectedPatients.forEach(currentPatient => {
                this.progressBarService.show();
                let result;
                result = this._patientsStore.deletePatient(currentPatient);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Patient ' + currentPatient.user.firstName + ' ' + currentPatient.user.lastName + ' deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadPatients();
                        this.notificationsStore.addNotification(notification);
                        this.selectedPatients = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete Patient ' + currentPatient.user.firstName + ' ' + currentPatient.user.lastName;
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedPatients = [];
                        this.progressBarService.hide();
                        this.notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this.progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'Select patients to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this.notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select patients to delete');
        }
    }

}