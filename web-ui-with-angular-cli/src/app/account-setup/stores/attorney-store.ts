import { PrefferedAttorney } from '../models/preffered-attorney';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Attorney } from '../models/attorney';
import { AttorneyMasterService } from '../services/attorney-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../commons/stores/session-store';
import { Account } from '../../account/models/account';

@Injectable()
export class AttorneyMasterStore {

    private _attorneyMaster: BehaviorSubject<List<Attorney>> = new BehaviorSubject(List([]));
    private _allAttorneyInMidas: BehaviorSubject<List<Attorney>> = new BehaviorSubject(List([]));
    private _allProvidersInMidas: BehaviorSubject<List<Account>> = new BehaviorSubject(List([]));

    constructor(
        private _attorneyMasterService: AttorneyMasterService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get attorneyMasters() {
        return this._attorneyMaster.asObservable();
    }
    get allAttorney() {
        return this._allAttorneyInMidas.asObservable();
    }

    getAttorneyMasters(): Observable<Attorney[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._attorneyMasterService.getAllAttorneyMasterByCompany(companyId).subscribe((Attorneys: Attorney[]) => {
                this._attorneyMaster.next(List(Attorneys));
                resolve(Attorneys);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney[]>>Observable.fromPromise(promise);
    }

    getAllAttorney(): Observable<PrefferedAttorney[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._attorneyMasterService.getAllAttorney(companyId).subscribe((allAttorney: PrefferedAttorney[]) => {
                // this._allAttorneyInMidas.next(List(allAttorney));
                resolve(allAttorney);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PrefferedAttorney[]>>Observable.fromPromise(promise);
    }

    assignAttorney(id: number): Observable<Attorney> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._attorneyMasterService.assignAttorney(id, companyId).subscribe((attorney: Attorney) => {
                // this._attorneyMaster.next(List(allattorney));
                resolve(attorney);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }

    // findAttorneyById(id: number): Attorney {
    //     let attorney = this._attorneyMaster.getValue();
    //     let index = attorney.findIndex((currentAttorney: Attorney) => currentAttorney.id === id);
    //     return attorney.get(index);
    // }

    fetchAttorneyById(id: number): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
          
                this._attorneyMasterService.getAttorneyMaster(id).subscribe((attorney: Attorney) => {
                    resolve(attorney);
                }, error => {
                    reject(error);
                });
            
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }

    addAttorney(signUp: any): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
            this._attorneyMasterService.addAttorney(signUp).subscribe((any) => {
                this._attorneyMaster.next(this._attorneyMaster.getValue().push(any));
                resolve(any);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }
    // updateAttorney(attorney: any): Observable<Attorney> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._attorneyMasterService.updateAttorney(attorney).subscribe((updatedAttorney: any) => {
    //             let attorney: List<Attorney> = this._attorneyMaster.getValue();
    //             let index = attorney.findIndex((currentAttorney: any) => currentAttorney.id === updatedAttorney.id);
    //             attorney = attorney.update(index, function () {
    //                 return updatedAttorney;
    //             });
    //             this._attorneyMaster.next(attorney);
    //             resolve(attorney);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<Attorney>>Observable.from(promise);
    // }


    updateAttorney(signUp: Attorney): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
            this._attorneyMasterService.updateAttorney(signUp).subscribe((Attorney) => {
                this._attorneyMaster.next(this._attorneyMaster.getValue().push(Attorney));
                resolve(Attorney);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }

    deleteAttorney(attorney: Attorney) {
        let attorneys = this._attorneyMaster.getValue();
        let index = attorneys.findIndex((currentAttorney: Attorney) => currentAttorney.id === attorney.id);
        let promise = new Promise((resolve, reject) => {
            this._attorneyMasterService.deleteAttorney(attorney)
                .subscribe((attorney: Attorney) => {
                    this._attorneyMaster.next(attorneys.delete(index));
                    resolve(attorney);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }


    getAllProviders(): Observable<Account[]> {
        let promise = new Promise((resolve, reject) => {
            this._attorneyMasterService.getAllProviders().subscribe((allProvider: Account[]) => {
                this._allProvidersInMidas.next(List(allProvider));
                resolve(allProvider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Account[]>>Observable.fromPromise(promise);
    }

    resetStore() {
        this._attorneyMaster.next(this._attorneyMaster.getValue().clear());
        this._allAttorneyInMidas.next(this._allAttorneyInMidas.getValue().clear());
    }



}
