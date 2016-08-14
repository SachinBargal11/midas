System.register(['@angular/core', '@angular/forms', '@angular/router', '../../elements/loader', '../../../stores/providers-store', '../../../models/provider', '../../../services/providers-service', '../../../stores/session-store', '../../../stores/notifications-store', '../../../models/notification', 'moment', 'primeng/primeng', '@angular/http', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, loader_1, providers_store_1, provider_1, providers_service_1, session_store_1, notifications_store_1, notification_1, moment_1, primeng_1, http_1, limit_array_pipe_1;
    var AddProviderComponent;
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
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (providers_store_1_1) {
                providers_store_1 = providers_store_1_1;
            },
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (providers_service_1_1) {
                providers_service_1 = providers_service_1_1;
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
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            AddProviderComponent = (function () {
                function AddProviderComponent(_providerService, _providersStore, fb, _router, _notificationsStore, _sessionStore, _elRef) {
                    this._providerService = _providerService;
                    this._providersStore = _providersStore;
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._elRef = _elRef;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveProviderProgress = false;
                    this.providerform = this.fb.group({
                        provider: this.fb.group({
                            name: ['', forms_1.Validators.required],
                            npi: ['', forms_1.Validators.required],
                            federalTaxID: ['', forms_1.Validators.required],
                            prefix: ['', forms_1.Validators.required]
                        })
                    });
                    this.providerformControls = this.providerform.controls;
                }
                AddProviderComponent.prototype.ngOnInit = function () {
                };
                AddProviderComponent.prototype.saveProvider = function () {
                    var _this = this;
                    var providerFormValues = this.providerform.value;
                    var providerDetail = new provider_1.Provider({
                        provider: {
                            name: providerFormValues.provider.name,
                            npi: providerFormValues.provider.npi,
                            federalTaxID: providerFormValues.provider.federalTaxID,
                            prefix: providerFormValues.provider.prefix,
                            createByUserID: 176
                        }
                    });
                    this.isSaveProviderProgress = true;
                    var result;
                    // result = this._providersStore.addProvider(providerDetail);
                    result = this._providerService.addProvider(providerDetail);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'Provider added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/providers']);
                    }, function (error) {
                        var notification = new notification_1.Notification({
                            'title': 'Unable to add Provider.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSaveProviderProgress = false;
                    });
                };
                AddProviderComponent = __decorate([
                    core_1.Component({
                        selector: 'add-provider',
                        templateUrl: 'templates/pages/providers/add-provider.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, primeng_1.Calendar, primeng_1.InputMask, primeng_1.AutoComplete],
                        providers: [http_1.HTTP_PROVIDERS, providers_service_1.ProvidersService, providers_store_1.ProvidersStore],
                        pipes: [limit_array_pipe_1.LimitPipe]
                    }), 
                    __metadata('design:paramtypes', [providers_service_1.ProvidersService, providers_store_1.ProvidersStore, forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, session_store_1.SessionStore, core_1.ElementRef])
                ], AddProviderComponent);
                return AddProviderComponent;
            }());
            exports_1("AddProviderComponent", AddProviderComponent);
        }
    }
});
//# sourceMappingURL=add-provider.js.map