import { Insurance } from '../../account/models/insurance';
import { Patient } from '../../account/models/patient';
import { Employer } from '../../account/models/employer';
import { FamilyMember } from '../../account/models/family-member';
import { Address } from '../../commons/models/address';
import { Contact } from '../../commons/models/contact';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { PatientsStore } from '../../account/stores/patients-store';
import { EmployerStore } from '../../account/stores/employer-store';
import { InsuranceStore } from '../../account/stores/insurance-store';
import { FamilyMemberStore } from '../../account/stores/family-member-store';
import { AppValidators } from '../../commons/utils/AppValidators';
import * as moment from 'moment';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../commons/models/notification';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { User } from '../../commons/models/user';
import { DateFormatPipe } from '../../commons/pipes/date-format-pipe';
import * as _ from 'underscore';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})

export class DashboardComponent {
    patientId: number;
    patientInfo: Patient;
    familyMember: FamilyMember[];
    employer: Employer;
    noEmployer: string;
    noInsurances: string;
    noFamilyMember: string;
    insurances: Insurance[];
    dateOfFirstTreatment: string;
    dateOfBirth: string;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
       public notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _patientsStore: PatientsStore,
        private _familyMemberStore: FamilyMemberStore,
        private _insuranceStore: InsuranceStore,
        private _dateFormatPipe: DateFormatPipe,
        private _employerStore: EmployerStore
    ) {
        this.patientId = this.sessionStore.session.user.id;
        this.progressBarService.show();
        let result = this._patientsStore.getPatientById(this.patientId);
        result.subscribe(
            (patient: Patient) => {
                this.patientInfo = patient;
                this.dateOfFirstTreatment = this.patientInfo.dateOfFirstTreatment ?
                    this._dateFormatPipe.transform(this.patientInfo.dateOfFirstTreatment)
                    : null;
                this.dateOfBirth = this.patientInfo.dateOfFirstTreatment ?
                    this._dateFormatPipe.transform(this.patientInfo.user.dateOfBirth)
                    : null;
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });

        let empResult = this._employerStore.getCurrentEmployer(this.patientId);
        empResult.subscribe(
            (employer: Employer) => {
                if (employer.id) {
                    this.employer = employer;
                } else {
                    this.noEmployer = 'No Employer available';
                }
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });

        let familyResult = this._familyMemberStore.getFamilyMembers(this.patientId);
        familyResult.subscribe(
            (familyMember: FamilyMember[]) => {
                if (familyMember.length) {
                    this.familyMember = familyMember;
                } else {
                    this.noFamilyMember = 'No Family Member Available';
                }
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });

        this.progressBarService.show();
        this._insuranceStore.getInsurances(this.patientId)
            .subscribe(insurances => {
                if (insurances.length) {
                    this.insurances = insurances;
                } else {
                    this.noInsurances = 'No Insurance Information Available';
                }
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
    }
}