System.register(['@angular/core', '@angular/router', '../../../stores/patients-store'], function(exports_1, context_1) {
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
    var core_1, router_1, patients_store_1;
    var PatientsListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (patients_store_1_1) {
                patients_store_1 = patients_store_1_1;
            }],
        execute: function() {
            PatientsListComponent = (function () {
                function PatientsListComponent(_router, _patientsStore) {
                    this._router = _router;
                    this._patientsStore = _patientsStore;
                }
                PatientsListComponent.prototype.ngOnInit = function () {
                };
                PatientsListComponent.prototype.selectPatients = function (patient) {
                    this._patientsStore.selectPatient(patient);
                    this._router.navigate(['/patients/' + patient.id]);
                };
                PatientsListComponent = __decorate([
                    core_1.Component({
                        selector: 'patients-list',
                        templateUrl: 'templates/pages/patients/patients-list.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, patients_store_1.PatientsStore])
                ], PatientsListComponent);
                return PatientsListComponent;
            }());
            exports_1("PatientsListComponent", PatientsListComponent);
        }
    }
});
//# sourceMappingURL=patients-list.js.map