import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {UsersStore} from '../../stores/users-store';
import {UserDetail} from '../../models/user-details';
import {User} from '../../models/user';
import {Contact} from '../../models/contact';
import {Address} from '../../models/address';
import $ from 'jquery';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';
import {Notification} from '../../models/notification';
import moment from 'moment';
import {Calendar, RadioButton, SelectItem} from 'primeng/primeng';
import {Gender} from '../../models/enums/Gender';
import {UserType} from '../../models/enums/UserType';

@Component({
    selector: 'add-user',
    templateUrl: 'templates/pages/add-user.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, Calendar, RadioButton]
})

export class AddUserComponent implements OnInit {

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    userform: FormGroup;
    userformControls;
    isSaveUserProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _elRef: ElementRef
    ) {
        this.userform = this.fb.group({
            userInfo: this.fb.group({
                firstname: ['', Validators.required],
                middlename: ['', Validators.required],
                lastname: ['', Validators.required],
                // gender: ['', Validators.required],
                // dob: ['', Validators.required],
                userType: ['', Validators.required]
            }),
            contact: this.fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: ['']
            }),
            address: this.fb.group({
                address1: ['', Validators.required],
                address2: [''],
                city: ['', Validators.required],
                zipCode: ['', Validators.required],
                state: ['', Validators.required],
                country: ['', Validators.required]
            })
        });

        this.userformControls = this.userform.controls;

    }

    ngOnInit() {

    }


    saveUser() {
        let userFormValues = this.userform.value;
        let userDetail = new UserDetail({
            user: new User({
                firstName: userFormValues.userInfo.firstname,
                middleName: userFormValues.userInfo.middlename,
                lastName: userFormValues.userInfo.lastname,
                gender: parseInt(userFormValues.userInfo.gender), //Gender[1],//
                dateOfBirth: moment(),//userFormValues.userInfo.dob),
                userType: parseInt(userFormValues.userInfo.userType), //UserType[1],//,
            }),
            contactInfo: new Contact({
                cellPhone: userFormValues.contact.cellPhone,
                email: userFormValues.contact.email,
                faxNo: userFormValues.contact.faxNo,
                homePhone: userFormValues.contact.homePhone,
                workPhone: userFormValues.contact.workPhone,
            }),
            address: new Address({
                address1: userFormValues.address.address1,
                address2: userFormValues.address.address2,
                city: userFormValues.address.city,
                country: userFormValues.address.country,
                state: userFormValues.address.state,
                zipCode: userFormValues.address.zipCode,
            })
        });
        this.isSaveUserProgress = true;
        var result;

        result = this._usersStore.addUser(userDetail);
        result.subscribe(
            (response) => {
                var notification = new Notification({
                    'title': 'User added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/users/add']);
            },
            (error) => {
                var notification = new Notification({
                    'title': 'Unable to add user.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveUserProgress = false;
            });

    }

}