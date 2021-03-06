import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { Message } from 'primeng/primeng'
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
//import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { ConsentStore } from '../stores/consent-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConsentService } from '../services/consent-service';
import { Consent } from '../models/consent';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import { ScannerService } from '../../../commons/services/scanner-service';

@Component({
    selector: 'edit-consent',
    templateUrl: './edit-consent.html',
    providers: [ConsentService]
})

export class EditConsentComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    msgs: Message[];
    uploadedFiles: any[] = [];

    currentId: number;
    UploadedFileName: string;
    //document: VisitDocument;
    url;
    doctors: any[];
    isdoctorsLoading = false;
    isSaveProgress = false;
    states: any[];
    consentDetail: Consent;
    consentForm: FormGroup;
    consentformControls;

    minDate: Date;
    maxDate: Date;
    patientId: number;
    caseId: number;
    doctroId: number;
    selectedDoctor = 0;
    companyId: number;
    document: Consent[] = [];
    doctorApprovalId: number;
    documentMode: string = '3';
    scannerContainerId: string = `scanner_${moment().valueOf()}`;
    twainSources: TwainSource[] = [];
    selectedTwainSource: TwainSource = null;
    _dwObject: any = null;

    constructor(
        private fb: FormBuilder,
        private service: ConsentService,
        private _router: Router,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _ConsentStore: ConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private http: Http,
        private _scannerService: ScannerService,

    ) {

        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            // let companyId: number = this._sessionStore.session.currentCompany.id;
            this.companyId = this._sessionStore.session.currentCompany.id;
            this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.companyId + '/' + this.caseId;
            this.consentForm = this.fb.group({
                //  doctor: ['', Validators.required]
                //uploadedFile: ['', Validators.required]
            });

            this.consentformControls = this.consentForm.controls;
        })
        this._route.params.subscribe((routeParams: any) => {
            this.doctorApprovalId = parseInt(routeParams.id);
            this._progressBarService.show();
            let resultD = this._ConsentStore.editDoctorCaseConsentApproval(this.doctorApprovalId);
            resultD.subscribe(
                (consentDetail: Consent) => {
                    this.consentDetail = consentDetail;
                    this.selectedDoctor = consentDetail.doctorId;
                    this.file.name = consentDetail.consentReceived;
                    this.uploadedFiles.push(this.file);
                    this.UploadedFileName = this.file.name;
                    //this.selectedDoctoredit = consentDetail.doctorId.toString();
                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
    }

    file = {
        "name": "",
        "image": '',
        "webkitRelativePath": "../download.jpg"

    }

    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._ConsentStore.getdoctors(this.companyId)
            .subscribe(doctor => this.doctors = doctor);
        // this.downloadDocument();
    }
    ngAfterViewInit() {
        _.defer(() => {
            this._scannerService.getWebTwain(this.scannerContainerId)
                .then((dwObject) => {
                    this._dwObject = dwObject;
                    if (this._dwObject) {
                        for (let i = 0; i < this._dwObject.SourceCount; i++) {
                            this.twainSources.push({ idx: i, name: this._dwObject.GetSourceNameItems(i) });
                        }

                    }
                }).catch(() => {
                    // (<any>window).OnWebTwainNotFoundOnWindowsCallback();
                    this._notificationsService.alert('', 'Not able to connect scanner. Please refresh the page again and download the software prompted.');
                });
        });

    }

    AcquireImage() {
        if (this._dwObject) {
            this._dwObject.IfDisableSourceAfterAcquire = true;
            if (this.selectedTwainSource) {
                this._dwObject.SelectSourceByIndex(this.selectedTwainSource.idx);
            } else {
                this._dwObject.SelectSource();
            }
            this._dwObject.OpenSource();
            this._dwObject.AcquireImage();
        }
    }
    selectDoctor(event) {
        this.selectedDoctor = 0;
        let currentDoctor = event.target.value;
    }

    myfile = {
        "name": "",
        "image": ''
    }

    onUpload(event) {
        this.uploadedFiles = [];

        for (let file of event.files) {
            this.uploadedFiles.push(file);
            this.UploadedFileName = file.name;
        }
        this.msgs = [];
        this.msgs = [];
        let notification = new Notification({

            'title': 'File uploaded!',
            'type': 'SUCCESS',
            'createdAt': moment()
        });
        this._notificationsStore.addNotification(notification);

        //this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: this.UploadedFileName });
        // this.msgs.push({ UploadedFileName});
        // this.downloadDocument();

    }

    downloadDocument() {
        this._progressBarService.show();
        this._ConsentStore.getDocumentsForCaseId(this.caseId)
            .subscribe(document => {
                this.document = document

            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    Save() {
        this.isSaveProgress = true;
        let consentFormValues = this.consentForm.value;
        let result;
        let consentDetail = new Consent({
            id: this.doctorApprovalId,
            caseId: this.caseId,
            patientId: this.patientId,
            doctorId: parseInt(consentFormValues.doctor),
            //consentReceived: this.UploadedFileName,
            companyId: this.companyId
        });

        this._progressBarService.show();
        result = this._ConsentStore.Save(consentDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Consent form updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update consent form.';
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

    DownloadTemplate() {
        window.location.assign(this._url + '/CompanyCaseConsentApproval/download/' + '/' + this.companyId + '/' + this.caseId);
    }

}
export interface TwainSource {
    idx: number;
    name: string;
}
