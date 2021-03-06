import {Injectable} from '@angular/core';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {States} from '../models/states';
import {StateService} from '../services/state-service';
import {SessionStore} from './session-store';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class StatesStore {

    private _states: BehaviorSubject<List<States>> = new BehaviorSubject(List([]));

    constructor(
        private _statesService: StateService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._states.next(this._states.getValue().clear());
    }

    get states() {
        return this._states.asObservable();
    }

    getStates() {
        let promise = new Promise((resolve, reject) => {
            this._statesService.getStates().subscribe((states: States[]) => {
                this._states.next(List(states));
                resolve(states);
            }, error => {
                reject(error);
            });
        });
        return promise;
    }
}