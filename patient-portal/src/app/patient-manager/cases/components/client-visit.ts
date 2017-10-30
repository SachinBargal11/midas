import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { PatientsStore } from '../../patients/stores/patients-store';
import { Patient } from '../../patients/models/patient';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import * as _ from 'underscore';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { Observable } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'client-visit-list',
    templateUrl: './client-visit.html'
})

export class ClientVisitListComponent implements OnInit {
    selectedVisits: PatientVisit[] = [];
    selectedDoctorsVisits: PatientVisit[] = [];
    selectedRoomsVisits: PatientVisit[] = [];
    visits: PatientVisit[];
    selectedClientVisits: PatientVisit[];
    caseId: number;
    patientId: number;
    datasource: PatientVisit[];
    totalRecords: number;
    currentDoctorName: string;
    currentRoomName: string;
    // matchingVisits: PatientVisit[];
    doctorsVisits: PatientVisit[];
    roomsVisits: PatientVisit[];
    // doctors:Doctor[];
    doctor: Doctor;
    room: Room;
    patientName: string;
    patient: Patient;
    isDeleteProgress: boolean = false;
    caseStatusId: number;
    clientDialogVisible = false;
    selectedVisitId: number;
    visitInfo = 'Visit Info';
    clientVisit;
    case: Case;
    selectedVisit: PatientVisit;
    routeFromCase: true;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _patientStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _doctorsStore: DoctorsStore,
        private _roomsStore: RoomsStore,
        private confirmationService: ConfirmationService,
        private _casesStore: CasesStore,
        public sessionStore: SessionStore,

    ) {
         this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            // this.visitUploadDocumentUrl = this._url + '/documentmanager/uploadtoblob';
            this._progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseStatusId = caseDetail.caseStatusId;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });


        // this._route.parent.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = this.sessionStore.session.user.id;
            this._progressBarService.show();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    // this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
                    this.patientName = patient.user.displayName;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        // });
    }

    ngOnInit() {
        this.loadPatientVisits();
    }

    loadPatientVisits() {
        this._progressBarService.show();
        this._patientVisitStore.getClientVisitsByCaseId(this.caseId)
            .subscribe((visits: PatientVisit[]) => {
                this.visits = visits.reverse();
                // let matchingDoctorVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                //     return currentVisit.doctor != null;
                // });
                // this.doctorsVisits = matchingDoctorVisits.reverse();

                // let matchingRoomVisits: PatientVisit[] = _.filter(matchingVisits, (currentVisit: PatientVisit) => {
                //     return currentVisit.room != null;
                // });
                // this.roomsVisits = matchingRoomVisits.reverse();

            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadPatientVisitsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.visits = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    showDialog(visit: any) {
        this._patientVisitStore.getPatientVisitDetailById(visit.id)
            .subscribe((visit: PatientVisit) => {
                this.selectedVisit = visit;
                this.selectedVisitId = visit.id;
                this.clientDialogVisible = true;
            });
    }

    closePatientVisitDialog() {
        this.clientDialogVisible = false;
        this.handleClientDialogHide();
    }

    handleClientDialogHide() {
        this.selectedVisitId = null;
    }

    deletePatientVisits() {
        this.selectedVisits = _.union(this.selectedRoomsVisits, this.selectedDoctorsVisits);
        if (this.selectedVisits.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedVisits.forEach(currentVisit => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result;
                        result = this._patientVisitStore.deletePatientVisit(currentVisit);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Visit deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadPatientVisits();
                                this._notificationsStore.addNotification(notification);
                                this.selectedVisits = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete visits';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedVisits = [];
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
                'title': 'Select visit to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select visit to delete');
        }
    }
    // bill() {
    //     this._notificationsService.success('Success', 'Bill No AB69852 has been successfully created');
    // }

}