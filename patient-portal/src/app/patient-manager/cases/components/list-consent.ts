import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { ConsentStore } from '../stores/consent-store';
import { Consent } from '../models/consent';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { SessionStore } from '../../../commons/stores/session-store';
import { environment } from '../../../../environments/environment';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { CaseDocument } from '../models/case-document';
@Component({
    selector: 'list-consent',
    templateUrl: './list-consent.html'
})

export class ConsentListComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    selectedConsentList: Consent[] = [];
    Consent: Consent[];
    Case: Case;
    caseId: number;
    datasource: Consent[];
    totalRecords: number;
    isDeleteProgress: boolean = false;
    companyId: number;
    caseConsentDocuments: CaseDocument[];
    
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _ConsentStore: ConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        public sessionStore: SessionStore,
        private _casesStore: CasesStore,

    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
    }

    ngOnInit() {
        this.loadConsentForm();
    }

    loadConsentForm() {
        this._progressBarService.show();
       
        this._casesStore.getDocumentForCaseId(this.caseId)

            .subscribe((caseDocument: Case) => {
                this.caseConsentDocuments = caseDocument.caseCompanyConsentDocument;

            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadConsentFormLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.Consent = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteConsentForm() {
        if (this.selectedConsentList.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedConsentList.forEach(currentCaseDocument => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result = this._ConsentStore.deleteConsetForm(currentCaseDocument, this.companyId)
                        // let result = this._casesStore.deleteDocument(currentCaseDocument)
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Record deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                this.loadConsentForm();
                                this._notificationsStore.addNotification(notification);
                                this.selectedConsentList = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete record';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedConsentList = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                this._progressBarService.hide();
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'Select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select record to delete');
        }
    }


    DownloadPdf(documentId) {
        this._progressBarService.show();
          this._progressBarService.show();
        this._ConsentStore.downloadConsentForm(this.caseId, documentId)
            .subscribe(
            (response) => {
                // this.document = document
                window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);

            },
            (error) => {
                let errString = 'Unable to download';
                // let notification = new Notification({
                //     'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                //     'type': 'ERROR',
                //     'createdAt': moment()
                // });

                this._progressBarService.hide();
                // this._notificationsStore.addNotification("Unable to download");
                this._notificationsService.error('Oh No!', 'Unable to download');
            },
            () => {
                this._progressBarService.hide();
            });

    }
}