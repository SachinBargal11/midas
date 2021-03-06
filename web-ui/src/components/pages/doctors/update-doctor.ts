import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import { AppValidators } from '../../../utils/AppValidators';
import { UsersStore } from '../../../stores/users-store';
import { DoctorsStore } from '../../../stores/doctors-store';
import { DoctorsService } from '../../../services/doctors-service';
import { Doctor } from '../../../models/doctor';
import { User } from '../../../models/user';
import { Contact } from '../../../models/contact';
import { Address } from '../../../models/address';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { StatesStore } from '../../../stores/states-store';
import { StateService } from '../../../services/state-service';
import { ProgressBarService } from '../../../services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'update-doctor',
    templateUrl: 'templates/pages/doctors/update-doctor.html'
})

export class UpdateDoctorComponent implements OnInit {
    users: any[];
    states: any[];
    doctor = new Doctor({});
    user = new User({});
    address = new Address({});
    contactInfo = new Contact({});
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    doctorform: FormGroup;
    doctorformControls;
    isSaveDoctorProgress = false;

    constructor(
        private _stateService: StateService,
        private _statesStore: StatesStore,
        private _doctorsService: DoctorsService,
        private _doctorsStore: DoctorsStore,
        private _usersStore: UsersStore,
        private fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let doctorId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._doctorsStore.fetchDoctorById(doctorId);
            result.subscribe(
                (doctorDetail: Doctor) => {
                    this.doctor = doctorDetail;
                    this.user = doctorDetail.user;
                    // this.address = doctorDetail.address;
                    // this.contactInfo = doctorDetail.contactInfo;
                },
                (error) => {
                    this._router.navigate(['/doctors']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.doctorform = this.fb.group({
            doctor: this.fb.group({
                licenseNumber: ['', Validators.required],
                wcbAuthorization: ['', Validators.required],
                wcbRatingCode: ['', Validators.required],
                npi: ['', Validators.required],
                // federalTaxId: ['', Validators.required],
                taxType: ['', Validators.required],
                // assignNumber: ['', Validators.required],
                title: ['', Validators.required],
                user: ['', [Validators.required, AppValidators.selectedValueValidator]]
            })
            // userInfo: this.fb.group({
            //     firstName: ['', Validators.required],
            //     middleName: [''],
            //     lastName: ['', Validators.required],
            //     userType: ['', Validators.required],
            //     password: ['', Validators.required],
            //     confirmPassword: ['', Validators.required],
            // }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') }),
            // contact: this.fb.group({
            //     email: ['', [Validators.required, AppValidators.emailValidator]],
            //     cellPhone: ['', [Validators.required]],
            //     homePhone: [''],
            //     workPhone: [''],
            //     faxNo: ['']
            // }),
            // address: this.fb.group({
            //     address1: [''],
            //     address2: [''],
            //     city: [''],
            //     zipCode: [''],
            //     state: [''],
            //     country: ['']
            // })
        });

        this.doctorformControls = this.doctorform.controls;
    }

    ngOnInit() {

        this._usersStore.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }


    updateDoctor() {
        let doctorFormValues = this.doctorform.value;
        let doctorDetail = new Doctor({
            // doctor: new Doctor({
            id: this.doctor.id,
            licenseNumber: doctorFormValues.doctor.licenseNumber,
            wcbAuthorization: doctorFormValues.doctor.wcbAuthorization,
            wcbRatingCode: doctorFormValues.doctor.wcbRatingCode,
            npi: doctorFormValues.doctor.npi,
            taxType: doctorFormValues.doctor.taxType,
            title: doctorFormValues.doctor.title,
            // }),
            user: new User({
                id: doctorFormValues.doctor.user
                // userName: doctorFormValues.contact.email,
                // firstName: doctorFormValues.userInfo.firstName,
                // middleName: doctorFormValues.userInfo.middleName,
                // lastName: doctorFormValues.userInfo.lastName,
                // userType: parseInt(doctorFormValues.userInfo.userType),
                // password: doctorFormValues.userInfo.password
            })
            // contactInfo: new Contact({
            //     cellPhone: doctorFormValues.contact.cellPhone,
            //     emailAddress: doctorFormValues.contact.email,
            //     faxNo: doctorFormValues.contact.faxNo,
            //     homePhone: doctorFormValues.contact.homePhone,
            //     workPhone: doctorFormValues.contact.workPhone,
            // }),
            // address: new Address({
            //     address1: doctorFormValues.address.address1,
            //     address2: doctorFormValues.address.address2,
            //     city: doctorFormValues.address.city,
            //     country: doctorFormValues.address.country,
            //     state: doctorFormValues.address.state,
            //     zipCode: doctorFormValues.address.zipCode,
            // })
        });
        this._progressBarService.show();
        this.isSaveDoctorProgress = true;
        let result;

        result = this._doctorsStore.updateDoctor(doctorDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Doctor updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/doctors']);
            },
            (error) => {
                let errString = 'Unable to update Doctor.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveDoctorProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveDoctorProgress = false;
                this._progressBarService.hide();
            });

    }

}
