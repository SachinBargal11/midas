import { FamilyMember } from '../models/family-member';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { Notification } from '../../../commons/models/notification';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { FamilyMemberStore } from '../stores/family-member-store';

@Component({
    selector: 'add-family-member',
    templateUrl: './add-family-member.html'
})

export class AddFamilyMemberComponent implements OnInit {
    isCitiesLoading = false;
    patientId: number;
    caseId: number;
    familyMemberForm: FormGroup;
    familyMemberFormControls;
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _statesStore: StatesStore,
        public notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _familyMemberStore: FamilyMemberStore,
        private _elRef: ElementRef
    ) {
        this.patientId = this.sessionStore.session.user.id;
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
        });
        this.familyMemberForm = this.fb.group({
            relationId: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            age: ['', Validators.required],
            races: ['', Validators.required],
            ethnicities: ['', Validators.required],
            gender: ['', Validators.required],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            workPhone: [''],
            primaryContact: [1]
        });

        this.familyMemberFormControls = this.familyMemberForm.controls;
    }
    ngOnInit() {
    }

    save() {
        this.isSaveProgress = true;
        let familyMemberFormValues = this.familyMemberForm.value;
        let result;
        let familyMember = new FamilyMember({
            caseId: this.caseId,
            relationId: familyMemberFormValues.relationId,
            // fullName: 'qwerty1',
            // fullName: familyMemberFormValues.fullName,
            firstName: familyMemberFormValues.firstName,
            // familyName: 'qwerty2',
            // familyName: familyMemberFormValues.familyName,
            middleName: familyMemberFormValues.middleName,
            lastName: familyMemberFormValues.lastName,
            // sufix: 'qwerty3',
            // sufix: familyMemberFormValues.suffix,
            // prefix: 'qwerty4',
            age: familyMemberFormValues.age,
            raceId: familyMemberFormValues.races,
            ethnicitiesId: familyMemberFormValues.ethnicities,
            genderId: familyMemberFormValues.gender,
            cellPhone: familyMemberFormValues.cellPhone ? familyMemberFormValues.cellPhone.replace(/\-/g, '') : null,
            workPhone: familyMemberFormValues.workPhone,
            primaryContact: parseInt(familyMemberFormValues.primaryContact)
        });
        this.progressBarService.show();
        result = this._familyMemberStore.addFamilyMember(familyMember);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Family member added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add family member.';
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
