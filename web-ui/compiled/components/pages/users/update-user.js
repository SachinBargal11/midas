System.register(['@angular/core', '@angular/forms', '@angular/router', '../../../utils/AppValidators', '../../elements/loader', '../../../stores/users-store', '../../../models/user-details', '../../../models/user', '../../../services/users-service', '../../../models/account', '../../../models/contact', '../../../models/address', '../../../stores/session-store', '../../../stores/notifications-store', '../../../models/notification', 'moment', 'primeng/primeng', '../../../stores/states-store', '../../../services/state-service', '@angular/http', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, forms_1, router_1, AppValidators_1, loader_1, users_store_1, user_details_1, user_1, users_service_1, account_1, contact_1, address_1, session_store_1, notifications_store_1, notification_1, moment_1, primeng_1, states_store_1, state_service_1, http_1, limit_array_pipe_1;
    var UpdateUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (users_store_1_1) {
                users_store_1 = users_store_1_1;
            },
            function (user_details_1_1) {
                user_details_1 = user_details_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (account_1_1) {
                account_1 = account_1_1;
            },
            function (contact_1_1) {
                contact_1 = contact_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (states_store_1_1) {
                states_store_1 = states_store_1_1;
            },
            function (state_service_1_1) {
                state_service_1 = state_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            UpdateUserComponent = (function () {
                function UpdateUserComponent(_stateService, _statesStore, _userService, fb, _router, _route, _notificationsStore, _sessionStore, _usersStore, _elRef) {
                    var _this = this;
                    this._stateService = _stateService;
                    this._statesStore = _statesStore;
                    this._userService = _userService;
                    this.fb = fb;
                    this._router = _router;
                    this._route = _route;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._usersStore = _usersStore;
                    this._elRef = _elRef;
                    this.user = user_details_1.UserDetail.prototype.user;
                    // user: any[];
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveUserProgress = false;
                    this._route.params.subscribe(function (routeParams) {
                        var userId = parseInt(routeParams.id);
                        var result = _this._usersStore.fetchUserById(userId);
                        result.subscribe(function (userDetail) {
                            _this._usersStore.selectUser(userDetail);
                            _this.user = userDetail.user;
                        }, function (error) {
                            _this._router.navigate(['/users']);
                        }, function () {
                        });
                    });
                    this.userform = this.fb.group({
                        firstname: ['', forms_1.Validators.required],
                        middlename: [''],
                        lastname: ['', forms_1.Validators.required],
                        userType: ['', forms_1.Validators.required],
                        password: ['', forms_1.Validators.required],
                        confirmPassword: ['', forms_1.Validators.required],
                        contact: this.fb.group({
                            email: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.emailValidator]],
                            cellPhone: ['', [forms_1.Validators.required]],
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
                    }, { validator: AppValidators_1.AppValidators.matchingPasswords('password', 'confirmPassword') });
                    this.userformControls = this.userform.controls;
                }
                UpdateUserComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._stateService.getStates()
                        .subscribe(function (states) { return _this.states = states; });
                };
                UpdateUserComponent.prototype.updateUser = function () {
                    var _this = this;
                    var userFormValues = this.userform.value;
                    var userDetail = new user_details_1.UserDetail({
                        account: new account_1.Account({
                            id: this._sessionStore.session.account_id
                        }),
                        user: new user_1.User({
                            id: this.user.id,
                            firstName: userFormValues.firstname,
                            middleName: userFormValues.middlename,
                            lastName: userFormValues.lastname,
                            userType: parseInt(userFormValues.userType),
                            userName: userFormValues.contact.email,
                            password: userFormValues.password
                        }),
                        contactInfo: new contact_1.Contact({
                            cellPhone: userFormValues.contact.cellPhone,
                            emailAddress: userFormValues.contact.email,
                            faxNo: userFormValues.contact.faxNo,
                            homePhone: userFormValues.contact.homePhone,
                            workPhone: userFormValues.contact.workPhone,
                        }),
                        address: new address_1.Address({
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
                    result = this._usersStore.updateUser(userDetail);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'User updated successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/users']);
                    }, function (error) {
                        var notification = new notification_1.Notification({
                            'title': 'Unable to update user.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSaveUserProgress = false;
                    });
                };
                UpdateUserComponent = __decorate([
                    core_1.Component({
                        selector: 'update-user',
                        templateUrl: 'templates/pages/users/update-user.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, primeng_1.Calendar, primeng_1.InputMask, primeng_1.AutoComplete],
                        providers: [http_1.HTTP_PROVIDERS, users_service_1.UsersService, state_service_1.StateService, states_store_1.StatesStore, forms_1.FormBuilder],
                        pipes: [limit_array_pipe_1.LimitPipe]
                    }), 
                    __metadata('design:paramtypes', [state_service_1.StateService, states_store_1.StatesStore, users_service_1.UsersService, forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, notifications_store_1.NotificationsStore, session_store_1.SessionStore, users_store_1.UsersStore, core_1.ElementRef])
                ], UpdateUserComponent);
                return UpdateUserComponent;
            }());
            exports_1("UpdateUserComponent", UpdateUserComponent);
        }
    }
});
//# sourceMappingURL=update-user.js.map