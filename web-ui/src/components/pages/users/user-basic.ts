import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {UsersStore} from '../../../stores/users-store';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users-service';
import {AccountDetail} from '../../../models/account-details';
import {Account} from '../../../models/account';
import {Company} from '../../../models/company';
import {UserRole} from '../../../models/user-role';
import {Contact} from '../../../models/contact';
import {Address} from '../../../models/address';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';
import { UserType } from '../../../models/enums/user-type';

@Component({    
    selector: 'basic',
    templateUrl: 'templates/pages/users/user-basic.html',
    providers: [UsersService, StateService, StatesStore, FormBuilder]
})

export class UserBasicComponent implements OnInit { 
     userType: any;
    states: any[];
    user = new User({});
    address = new Address({});
    contact = new Contact({});
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
        private _stateService: StateService,
        private _statesStore: StatesStore,
        private _userService: UsersService,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            let userId: number = parseInt(routeParams.userId);
            let result = this._usersStore.fetchUserById(userId);
            result.subscribe(
                (userDetail: any) => {
                    this.user = userDetail;
                    this.contact = userDetail.contact,
                    this.address = userDetail.address,
                    this.userType = UserType[userDetail.userType];
                },
                (error) => {
                    this._router.navigate(['/medical-provider/users']);
                },
                () => {
                });
        });
        this.userform = this.fb.group({
            userInfo: this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                userType: [{value: '', disabled: true}, Validators.required]
            }),
            contact: this.fb.group({
                email: [{value: '', disabled: true}, [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: ['']
            }),
            address: this.fb.group({
                address1: [''],
                address2: [''],
                city: [''],
                zipCode: [''],
                state: [''],
                country: ['']
            })
        });

        this.userformControls = this.userform.controls;
    }

    ngOnInit() {
        // this._stateService.getStates()
        //     .subscribe(states => this.states = states);
    }


    updateUser() {
        let userFormValues = this.userform.value;
            let userDetail = new User({
                id: this.user.id,
                firstName: userFormValues.userInfo.firstName,
                lastName: userFormValues.userInfo.lastName,
                userType: this.user.userType,
                userName: this.user.userName,
                contact: new Contact({
                    cellPhone: userFormValues.contact.cellPhone,
                    emailAddress: this.contact.emailAddress,
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
        let result;

        result = this._usersStore.updateUser(userDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'User updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-provider/users']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to update user.',
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








// import {Component, OnInit, ElementRef} from '@angular/core';
// import {Validators, FormGroup, FormBuilder} from '@angular/forms';
// import {Router, ActivatedRoute} from '@angular/router';
// import {AppValidators} from '../../../utils/AppValidators';
// import {UsersStore} from '../../../stores/users-store';
// import {User} from '../../../models/user';
// import {UsersService} from '../../../services/users-service';
// import {AccountDetail} from '../../../models/account-details';
// import {Account} from '../../../models/account';
// import {Contact} from '../../../models/contact';
// import {Address} from '../../../models/address';
// import {SessionStore} from '../../../stores/session-store';
// import {NotificationsStore} from '../../../stores/notifications-store';
// import {Notification} from '../../../models/notification';
// import moment from 'moment';
// import {StatesStore} from '../../../stores/states-store';
// import {StateService} from '../../../services/state-service';

// @Component({
//     selector: 'basic',
//     templateUrl: 'templates/pages/users/user-basic.html',
//     providers: [UsersService, StateService, StatesStore, FormBuilder],
// })

// export class UserBasicComponent implements OnInit {
//     user = new Account({});
//     states: any[];
//     options = {
//         timeOut: 3000,
//         showProgressBar: true,
//         pauseOnHover: false,
//         clickToClose: false,
//         maxLength: 10
//     };
//     basicform: FormGroup;
//     basicformControls;
//     isSaveProgress = false;

//     constructor(
//         private _stateService: StateService,
//         private _statesStore: StatesStore,
//         private fb: FormBuilder,
//         private _router: Router,
//         public _route: ActivatedRoute,
//         private _notificationsStore: NotificationsStore,
//         private _sessionStore: SessionStore,
//         private _usersStore: UsersStore,
//         private _elRef: ElementRef
//     ) {
//         this._route.parent.params.subscribe((routeParams: any) => {
//             let userId: number = parseInt(routeParams.userId);
//             let result = this._usersStore.fetchUserById(userId);
//             result.subscribe(
//                 (userDetail: Account) => {
//                     this.user = userDetail;
//                 },
//                 (error) => {
//                     this._router.navigate(['/medical-provider/users']);
//                 },
//                 () => {
//                 });
//         });
//         this.basicform = this.fb.group({
//                 firstName: ['', Validators.required],
//                 lastName: ['', Validators.required],
//                 speciality: ['', Validators.required],
//                 salutation: ['', Validators.required],
//                 phone: ['', [Validators.required, AppValidators.mobileNoValidator]],
//                 photo: ['']
//             });

//         this.basicformControls = this.basicform.controls;
//     }

//     ngOnInit() {
//     }


//     save() {
//         let basicformValues = this.basicform.value;

//     }

// }
