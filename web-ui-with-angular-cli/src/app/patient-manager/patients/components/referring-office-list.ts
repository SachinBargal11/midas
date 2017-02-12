import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReferringOfficeStore } from '../stores/referring-office-store';
import { ReferringOffice } from '../models/referring-office';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'referring-office-list',
    templateUrl: './referring-office-list.html'
})

export class ReferringOfficeListComponent implements OnInit {
    selectedReferringOffices: ReferringOffice[] = [];
    referringOffices: ReferringOffice[];
    patientId: number;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _referringOfficeStore: ReferringOfficeStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
        });
    }

    ngOnInit() {
        this.loadReferringOffices();
    }

    loadReferringOffices() {
        this._progressBarService.show();
        this._referringOfficeStore.getReferringOffices(this.patientId)
            .subscribe(referringOffices => {
                this.referringOffices = referringOffices;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    deleteReferringOffice() {
        if (this.selectedReferringOffices.length > 0) {
            this.selectedReferringOffices.forEach(currentReferringOffice => {
                this._progressBarService.show();
                let result;
                result = this._referringOfficeStore.deleteReferringOffice(currentReferringOffice);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Referring Office deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadReferringOffices();
                        this._notificationsStore.addNotification(notification);
                        this.selectedReferringOffices = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete Referring Office';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedReferringOffices = [];
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select Referring Office to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Referring Office to delete');
        }
    }

}