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
import { AddConsentStore } from '../stores/add-consent-form-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { AddConsentFormService } from '../services/consent-form-service';
import { AddConsent } from '../models/add-consent-form';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';

@Component({
    selector: 'edit-consent-form',
    templateUrl: './edit-consent-form.html',
    providers: [AddConsentFormService]
})

export class EditConsentFormComponent implements OnInit {
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
    consentDetail: AddConsent;
    consentForm: FormGroup;
    consentformControls;

    minDate: Date;
    maxDate: Date;
    patientId: number;
    caseId: number;
    doctroId: number;
    selectedDoctor = 0;  
    companyId: number;  
    document: AddConsent[] = [];
    doctorApprovalId: number;


    constructor(
        private fb: FormBuilder,
        private service: AddConsentFormService,
        private _router: Router,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _AddConsentStore: AddConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private http: Http,

    ) {

        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            // let companyId: number = this._sessionStore.session.currentCompany.id;
            this.companyId = this._sessionStore.session.currentCompany.id;
            this.url = this._url + '/fileupload/multiupload/' + this.caseId + '/case';
            this.consentForm = this.fb.group({
                doctor: ['', Validators.required]
                //uploadedFile: ['', Validators.required]
            });

            this.consentformControls = this.consentForm.controls;
        })
        this._route.params.subscribe((routeParams: any) => {            
            this.doctorApprovalId = parseInt(routeParams.id);
            this._progressBarService.show();
            let resultD = this._AddConsentStore.editDoctorCaseConsentApproval(this.doctorApprovalId);           
            resultD.subscribe(
                (consentDetail: AddConsent) => {
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
        this._AddConsentStore.getdoctors(this.companyId)
            .subscribe(doctor => this.doctors = doctor);
        // this.downloadDocument();
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
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: this.UploadedFileName });
        // this.msgs.push({ UploadedFileName});
        // this.downloadDocument();

    }
    downloadDocument() {
        this._progressBarService.show();
        this._AddConsentStore.getDocumentsForCaseId(this.caseId)
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
        let consentDetail = new AddConsent({
            id: this.doctorApprovalId,
            caseId: this.caseId,
            patientId: this.patientId,
            doctorId: parseInt(consentFormValues.doctor),
            consentReceived: this.UploadedFileName
        });

        this._progressBarService.show();
        result = this._AddConsentStore.Save(consentDetail);
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
                let errString = 'Unable to update Consent form.';
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

}
