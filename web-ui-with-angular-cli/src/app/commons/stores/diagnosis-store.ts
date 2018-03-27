import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { DiagnosisCode } from '../models/diagnosis-code';
import { DiagnosisType } from '../models/diagnosis-type';
import { DiagnosisService } from '../services/diagnosis-service';
import { SessionStore } from './session-store';
import { DiagnosisCodeAdapter } from '../../commons/services/adapters/diagnosis-code-adapter';


@Injectable()
export class DiagnosisStore {

    private _diagnosisCodes: BehaviorSubject<List<DiagnosisCode>> = new BehaviorSubject(List([]));
    private _diagnosisTypes: BehaviorSubject<List<DiagnosisType>> = new BehaviorSubject(List([]));

    constructor(
        private _diagnosisService: DiagnosisService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._diagnosisCodes.next(this._diagnosisCodes.getValue().clear());
        this._diagnosisTypes.next(this._diagnosisTypes.getValue().clear());
    }

    get diagnosisCodes() {
        return this._diagnosisCodes.asObservable();
    }
    get diagnosisTypes() {
        return this._diagnosisTypes.asObservable();
    }

    // getAllDiagnosisTypes(): Observable<DiagnosisType[]> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._diagnosisService.getAllDiagnosisTypes().subscribe((diagnosisTypes: DiagnosisType[]) => {
    //             this._diagnosisTypes.next(List(diagnosisTypes));
    //             resolve(diagnosisTypes);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<DiagnosisType[]>>Observable.fromPromise(promise);
    // }

    getICDTypeCodeByCompanyId(): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisService.getICDTypeCodeByCompanyId().subscribe((data:any) => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    getDiagnosisTypeByCompanyId(): Observable<DiagnosisType[]> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisService.getDiagnosisTypeByCompanyId().subscribe((diagnosisTypes: DiagnosisType[]) => {
                resolve(diagnosisTypes);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DiagnosisType[]>>Observable.fromPromise(promise);
    }

     getDiagnosisCodesByCompanyIdAndDiagnosisTypeId(diagnosisTypeId: number): Observable<DiagnosisCode[]> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisService.getDiagnosisCodesByCompanyIdAndDiagnosisTypeId(diagnosisTypeId).subscribe((diagnosisCodes: DiagnosisCode[]) => {
                this._diagnosisCodes.next(List(diagnosisCodes));
                resolve(diagnosisCodes);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }

    getDiagnosisCodesByDiagnosisTypeId(diagnosisTypeId: number): Observable<DiagnosisCode[]> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisService.getDiagnosisCodesByDiagnosisTypeId(diagnosisTypeId).subscribe((diagnosisCodes: DiagnosisCode[]) => {
                this._diagnosisCodes.next(List(diagnosisCodes));
                resolve(diagnosisCodes);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }

    getAllDiagnosisCodes(): Observable<DiagnosisCode[]> {
        let promise = new Promise((resolve, reject) => {
            this._diagnosisService.getDiagnosisCode().subscribe((diagnosisCodes: DiagnosisCode[]) => {
                let diagnosisCodes1 = (<Object[]>diagnosisCodes).map((data: any) => {
                    return DiagnosisCodeAdapter.parseResponse(data);
                });
                resolve(diagnosisCodes1);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }

    
}