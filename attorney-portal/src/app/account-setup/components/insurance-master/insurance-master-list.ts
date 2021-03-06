import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { InsuranceMasterStore } from '../../stores/insurance-master-store';
import { InsuranceMaster } from '../../../patient-manager/patients/models/insurance-master';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
    selector: 'insurance-master-list',
    templateUrl: './insurance-master-list.html'
})

export class InsuranceMasterListComponent implements OnInit {
    selectedInsuranceMasters: InsuranceMaster[] = [];
    insuranceMasters: InsuranceMaster[];
    datasource: InsuranceMaster[];
    totalRecords: number;
    companyId: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _insuranceMasterStore: InsuranceMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private confirmationService: ConfirmationService,

    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadInsuranceMaster();
        });

    }

    ngOnInit() {
        this.loadInsuranceMaster();
    }

    loadInsuranceMaster() {
        this._progressBarService.show();
        this._insuranceMasterStore.getAllInsuranceMasters()
            .subscribe(insuranceMasters => {
                this.insuranceMasters = insuranceMasters.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadInsuranceMastersLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.insuranceMasters = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteInsuranceMasters() {
        if (this.selectedInsuranceMasters.length > 0) {
            this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
            this.selectedInsuranceMasters.forEach(currentInsuranceMaster => {
                this.isDeleteProgress = true;
                this._progressBarService.show();
                let result;
                result = this._insuranceMasterStore.deleteInsuranceMaster(currentInsuranceMaster);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Insurance master deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadInsuranceMaster();
                        this._notificationsStore.addNotification(notification);
                        this.selectedInsuranceMasters = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete insurance master';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedInsuranceMasters = [];
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                    });
            });
            }
            });
        } else {
            let notification = new Notification({
                'title': 'Select insurance master to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select insurance master to delete');
        }

    }

}