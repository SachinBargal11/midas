import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { PatientsStore } from '../../patients/stores/patients-store';
import { CasesStore } from '../../cases/stores/case-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { Patient } from '../../patients/models/patient';
import { Case } from '../models/case';

@Component({
    selector: 'cases-shell',
    templateUrl: './cases-shell.html'
})

export class CaseShellComponent implements OnInit {
     patientId: number;
     caseId: number;
     patientName: string;
     caseStatus: string;
     caseType: string;
     patient: Patient;
     caseDetail: Case;

    constructor(
        public router: Router,
        private _patientStore: PatientsStore,
        private _casesStore: CasesStore,
        public _route: ActivatedRoute,
        private _progressBarService: ProgressBarService,
        private _router: Router,
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

          this._route.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseDetail = caseDetail;
                    this.caseStatus = caseDetail.caseStatusLabel;
                    this.caseType = caseDetail.caseTypeLabel;
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

    }

}