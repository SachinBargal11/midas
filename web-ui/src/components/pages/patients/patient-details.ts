import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../../models/patient'
import {PatientsStore} from '../../../stores/patients-store';
import {PatientProfileComponent} from './profile-patient';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'patient-details',
    templateUrl: 'templates/pages/patients/patient-details.html',
    directives: [ROUTER_DIRECTIVES]
})

export class PatientDetailsComponent {

    patient: Patient;

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _patientsStore: PatientsStore
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let patientId: number = parseInt(routeParams.id);
            let patient = this._patientsStore.findPatientById(patientId);
            if (patient) {
                this._patientsStore.selectPatient(patient);
                this.patient = patient;
            }
            else {
                this._router.navigate(['/patients']);
            }
        });

    }
}