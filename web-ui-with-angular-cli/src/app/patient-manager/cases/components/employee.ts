import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators,FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';

@Component({
    selector: 'employee',
    templateUrl: './employee.html'
})

export class EmployeeComponent implements OnInit {
    states: any[];
    cities: any[];
    selectedCity = 0;
    isCitiesLoading = false;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    employeeform: FormGroup;
    employeeformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.employeeform = this.fb.group({
                jobTitle: ['', Validators.required],
                patientId: ['', Validators.required],
                employeeName: [''],
                isCurrentEmployee: ['', Validators.required],
                address: ['',Validators.required],
                address2: [''],
                state: [''],
                city:[''],
                zipcode:[''],
                country: [''],
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: ['']
            });

        this.employeeformControls = this.employeeform.controls;
    }

    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    selectState(event) {
        this.selectedCity = 0;
        let currentState = event.target.value;
        this.loadCities(currentState);
    }

    loadCities(stateName) {
        this.isCitiesLoading = true;
        if (stateName !== '') {
            this._statesStore.getCitiesByStates(stateName)
                .subscribe((cities) => { this.cities = cities; },
                null,
                () => { this.isCitiesLoading = false; });
        } else {
            this.cities = [];
            this.isCitiesLoading = false;
        }
    }


    save() {
    }

}