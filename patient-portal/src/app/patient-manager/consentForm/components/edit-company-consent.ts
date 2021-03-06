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
import { ConsentStore } from '../../cases/stores/consent-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Consent } from '../../cases/models/consent';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import { ScannerService } from '../../../commons/services/scanner-service';

@Component({
    selector: 'edit-company-consent',
    templateUrl: './edit-company-consent.html'
})

export class EditCompanyConsentComponent implements OnInit {
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
  documentMode: string = 'one';
    scannerContainerId: string = `scanner_${moment().valueOf()}`;
    twainSources: TwainSource[] = [];
    selectedTwainSource: TwainSource = null;
    _dwObject: any = null;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _consentStore: ConsentStore,
       public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private http: Http,
        private _scannerService: ScannerService,

    ) {

        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            // let companyId: number = this.sessionStore.session.currentCompany.id;
            this.companyId = 0;//this.sessionStore.session.currentCompany.id;
            this.url = this._url + '/fileupload/multiupload/' + this.caseId + '/consent';
            this.consentForm = this.fb.group({
                doctor: ['', Validators.required]
                //uploadedFile: ['', Validators.required]
            });

            this.consentformControls = this.consentForm.controls;
        })
        this._route.params.subscribe((routeParams: any) => {            
            this.doctorApprovalId = parseInt(routeParams.id);
            this.progressBarService.show();
            let resultD = this._consentStore.editDoctorCaseConsentApproval(this.doctorApprovalId);           
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
                    this.progressBarService.hide();
                },
                () => {
                    this.progressBarService.hide();
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
        this._consentStore.getdoctors(this.companyId)
            .subscribe(doctor => this.doctors = doctor);
        // this.downloadDocument();
    }

    ngOnDestroy() {
        this._scannerService.deleteWebTwain(this.scannerContainerId);
        this._scannerService.unloadAll();
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
        let notification = new Notification({

            'title': 'File Uploaded!',
            'type': 'SUCCESS',
            'createdAt': moment()
        });
        this.notificationsStore.addNotification(notification);

        //  this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: this.UploadedFileName });
        // this.msgs.push({ UploadedFileName});
        // this.downloadDocument();

    }
    downloadDocument() {
        this.progressBarService.show();
        this._consentStore.getDocumentsForCaseId(this.caseId)
            .subscribe(document => {
                this.document = document

            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
    }

    Save() {
       
        if (this.uploadedFiles.length == 0) {
            let errString = 'Please upload file.'
            let notification = new Notification({

                'title': 'Please upload file!',
                'type': 'SUCCESS',
                'createdAt': moment()
            });
            this.notificationsStore.addNotification(notification);
            // this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(notification, notification));
            this._notificationsService.error('Oh No!', "Please upload file");
            this.progressBarService.hide();
        }
        else {

            this.isSaveProgress = true;
            let consentFormValues = this.consentForm.value;
            let result;
            let consentDetail = new Consent({
                id: this.doctorApprovalId,
                caseId: this.caseId,
                patientId: this.patientId,
                doctorId: parseInt(consentFormValues.doctor),
                consentReceived: this.UploadedFileName
            });

            this.progressBarService.show();
            result = this._consentStore.Save(consentDetail);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Consent form updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this.notificationsStore.addNotification(notification);
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

    GenerateConsentForm() {

    }

}
export interface TwainSource {
    idx: number;
    name: string;
}
