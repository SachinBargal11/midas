System.register(['@angular/core', '@angular/http', 'underscore', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map', '../scripts/environment', '../stores/session-store', './adapters/medical-facility-adapter', '../models/enums/UserType'], function(exports_1, context_1) {
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
    var core_1, http_1, underscore_1, Observable_1, environment_1, session_store_1, medical_facility_adapter_1, UserType_1;
    var MedicalFacilityService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (environment_1_1) {
                environment_1 = environment_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (medical_facility_adapter_1_1) {
                medical_facility_adapter_1 = medical_facility_adapter_1_1;
            },
            function (UserType_1_1) {
                UserType_1 = UserType_1_1;
            }],
        execute: function() {
            MedicalFacilityService = (function () {
                function MedicalFacilityService(_http, _sessionStore) {
                    this._http = _http;
                    this._sessionStore = _sessionStore;
                    this._url = "" + environment_1.default.SERVICE_BASE_URL;
                    this._headers = new http_1.Headers();
                    this._headers.append('Content-Type', 'application/json');
                }
                MedicalFacilityService.prototype.getMedicalFacilities = function (accountId) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        return _this._http.get(_this._url + "/Account/Get/" + accountId).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            var medicalFacilities = data.medicalFacilities.map(function (medicalFacilityData) {
                                return medical_facility_adapter_1.MedicalFacilityAdapter.parseResponse(medicalFacilityData);
                            });
                            resolve(medicalFacilities);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                MedicalFacilityService.prototype.addMedicalFacility = function (medicalFacilityDetail) {
                    var _this = this;
                    var promise = new Promise(function (resolve, reject) {
                        var medicalFacilityDetailRequestData = medicalFacilityDetail.toJS();
                        // add/replace values which need to be changed
                        underscore_1.default.extend(medicalFacilityDetailRequestData.user, {
                            userType: UserType_1.UserType[medicalFacilityDetailRequestData.user.userType],
                            dateOfBirth: medicalFacilityDetailRequestData.user.dateOfBirth ? medicalFacilityDetailRequestData.user.dateOfBirth.toISOString() : null
                        });
                        // remove unneeded keys 
                        medicalFacilityDetailRequestData.user = underscore_1.default.omit(medicalFacilityDetailRequestData.user, 'password', 'userName', 'imageLink', 'dateOfBirth', 'name', 'userType', 'firstName', 'middleName', 'lastName', 'gender', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        medicalFacilityDetailRequestData.address = underscore_1.default.omit(medicalFacilityDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        medicalFacilityDetailRequestData.contactInfo = underscore_1.default.omit(medicalFacilityDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        medicalFacilityDetailRequestData.account = underscore_1.default.omit(medicalFacilityDetailRequestData.account, 'name', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        medicalFacilityDetailRequestData.medicalFacility = underscore_1.default.omit(medicalFacilityDetailRequestData.medicalFacility, 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
                        return _this._http.post(_this._url + '/MedicalFacility/Add', JSON.stringify(medicalFacilityDetailRequestData), {
                            headers: _this._headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (medicalFacilityData) {
                            var parsedMedicalFacility = null;
                            parsedMedicalFacility = medical_facility_adapter_1.MedicalFacilityAdapter.parseResponse(medicalFacilityData);
                            resolve(parsedMedicalFacility);
                        }, function (error) {
                            reject(error);
                        });
                    });
                    return Observable_1.Observable.fromPromise(promise);
                };
                MedicalFacilityService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, session_store_1.SessionStore])
                ], MedicalFacilityService);
                return MedicalFacilityService;
            }());
            exports_1("MedicalFacilityService", MedicalFacilityService);
        }
    }
});
//# sourceMappingURL=medical-facility-service.js.map