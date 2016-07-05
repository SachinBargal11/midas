System.register(['@angular/core', '@angular/router-deprecated', '../../../stores/patients-store'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, patients_store_1;
    var PatientProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (patients_store_1_1) {
                patients_store_1 = patients_store_1_1;
            }],
        execute: function() {
            PatientProfileComponent = (function () {
                function PatientProfileComponent(router, _routeParams, _patientsStore) {
                    this.router = router;
                    this._routeParams = _routeParams;
                    this._patientsStore = _patientsStore;
                    this.patient = this._patientsStore.currentPatient;
                }
                PatientProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile-patient',
                        templateUrl: 'templates/pages/patients/profile-patient.html',
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, patients_store_1.PatientsStore])
                ], PatientProfileComponent);
                return PatientProfileComponent;
            }());
            exports_1("PatientProfileComponent", PatientProfileComponent);
        }
    }
});
//# sourceMappingURL=profile-patient.js.map