import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { LocationsStore } from '../stores/locations-store';
import { LocationDetails } from '../models/location-details';
import { Location } from '../models/location';
import { Company } from '../../../account/models/company';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { States } from '../../../commons/models/states';
import { Cities } from '../../../commons/models/cities';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'add-location',
    templateUrl: './add-location.html'
})

export class AddLocationComponent implements OnInit {
    states: any[];
    cities: any[];
    selectedCity = 0;
    location = new Location({});
    locationJS;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    addlocationform: FormGroup;
    addlocationformControls;
    isSaveProgress = false;
    isCitiesLoading = false;

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this.locationJS = this.location.toJS();
        this.addlocationform = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            officePhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            fax: [''],
            locationType: ['', Validators.required]
        });

        this.addlocationformControls = this.addlocationform.controls;
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
        if ( stateName !== '') {
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
        let addlocationformValues = this.addlocationform.value;
        let basicInfo = new LocationDetails({
            location: new Location({
                name: addlocationformValues.name,
                locationType: parseInt(addlocationformValues.locationType)
            }),
            company: new Company({
                id: this._sessionStore.session.currentCompany.id
            }),
            contact: new Contact({
                faxNo: addlocationformValues.fax ? addlocationformValues.fax.replace(/\-|\s/g, '') : null,
                workPhone: addlocationformValues.officePhone ? addlocationformValues.officePhone.replace(/\-/g, '') : null
            }),
            address: new Address({
                address1: addlocationformValues.address,
                city: addlocationformValues.city,
                state: addlocationformValues.state,
                zipCode: addlocationformValues.zipCode
            })
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._locationsStore.addLocation(basicInfo);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Location added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-provider/locations']);
            },
            (error) => {
                let errString = 'Unable to add location.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });

    }

}
