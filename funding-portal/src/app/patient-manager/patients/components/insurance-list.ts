import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { InsuranceStore } from '../stores/insurance-store';
import { Insurance } from '../models/insurance';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { SessionStore } from '../../../commons/stores/session-store';
import { Case } from '../../cases/models/case';
import { CasesStore } from '../../cases/stores/case-store';


@Component({
    selector: 'insurance-list',
    templateUrl: './insurance-list.html'
})

export class InsuranceListComponent implements OnInit {
    caseDetail: Case[];
    referredToMe: boolean = false;
    selectedInsurances: Insurance[] = [];
    insurances: Insurance[];
    patientId: number;
    datasource: Insurance[];
    totalRecords: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _insuranceStore: InsuranceStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _casesStore: CasesStore,
        private _sessionStore: SessionStore
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
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
    }

    ngOnInit() {
        this.loadInsurances();
    }

    loadInsurances() {
        this._progressBarService.show();
        this._insuranceStore.getInsurances(this.patientId)
            .subscribe(insurances => {
                this.insurances = insurances.reverse();
                // this.datasource = insurances.reverse();
                // this.totalRecords = this.datasource.length;
                // this.insurances = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadSpecialitiesLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.insurances = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteInsurance() {
        if (this.selectedInsurances.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedInsurances.forEach(currentInsurance => {
                        this._progressBarService.show();
                        this.isDeleteProgress = true;
                        let result;
                        result = this._insuranceStore.deleteInsurance(currentInsurance);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Insurance deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadInsurances();
                                this._notificationsStore.addNotification(notification);
                                this.selectedInsurances = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete Insurance';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedInsurances = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
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
                'title': 'select Insurance to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Insurance to delete');
        }
    }

}