import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Speciality} from '../models/speciality';
import {SpecialityService} from '../services/speciality-service';
import {SessionStore} from './session-store';
import {Subject} from 'rxjs/Subject';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import _ from 'underscore';
import Moment from 'moment';


@Injectable()
export class SpecialityStore {

    private _specialities: BehaviorSubject<List<Speciality>> = new BehaviorSubject(List([]));
    private _selectedSpecialities: BehaviorSubject<List<Speciality>> = new BehaviorSubject(List([]));

    constructor(
        private _specialityService: SpecialityService,
        private _sessionStore: SessionStore
    ) {
        this.loadInitialData();
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._specialities.next(this._specialities.getValue().clear());
        this._selectedSpecialities.next(this._selectedSpecialities.getValue().clear());
    }


    get specialities() {
        return this._specialities.asObservable();
    }

    get selectedSpecialities() {
        return this._selectedSpecialities.asObservable();
    }

    loadInitialData(): Observable<Speciality[]> {
        let promise = new Promise((resolve, reject) => {
            this._specialityService.getSpecialities().subscribe((specialities: Speciality[]) => {
                this._specialities.next(List(specialities));
                resolve(specialities);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Speciality[]>>Observable.fromPromise(promise);
    }

    findSpecialityById(id: number) {
        let specialities = this._specialities.getValue();
        let index = specialities.findIndex((currentSpeciality: Speciality) => currentSpeciality.speciality.id === id);
        return specialities.get(index);
    }

    fetchSpecialityById(id: number): Observable<Speciality> {
        let promise = new Promise((resolve, reject) => {
            let matchedSpeciality: Speciality = this.findSpecialityById(id);
            if (matchedSpeciality) {
                resolve(matchedSpeciality);
            } else {
                this._specialityService.getSpeciality(id)
                .subscribe((speciality: Speciality) => {
                    resolve(speciality);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Speciality>>Observable.fromPromise(promise);
    }

    addSpeciality(speciality: Speciality): Observable<Speciality> {
        let promise = new Promise((resolve, reject) => {
            this._specialityService.addSpeciality(speciality).subscribe((speciality: Speciality) => {
                this._specialities.next(this._specialities.getValue().push(speciality));
                resolve(speciality);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Speciality>>Observable.from(promise);
    }

    updateSpeciality(speciality: Speciality): Observable<Speciality> {
        let specialities = this._specialities.getValue();
        let index = specialities.findIndex((currentSpeciality: Speciality) => currentSpeciality.speciality.id === speciality.speciality.id);
        let promise = new Promise((resolve, reject) => {
            this._specialityService.updateSpeciality(speciality).subscribe((currentSpeciality: Speciality) => {
                this._specialities.next(this._specialities.getValue().push(speciality));
                resolve(speciality);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Speciality>>Observable.from(promise);
    }

     selectSpecialities(speciality: Speciality) {
        let selectedSpecialities = this._selectedSpecialities.getValue();
        let index = selectedSpecialities.findIndex((currentSpeciality: Speciality) => currentSpeciality.speciality.id === speciality.speciality.id);
        if (index < 0) {
            this._selectedSpecialities.next(this._selectedSpecialities.getValue().push(speciality));
        }
    }


}