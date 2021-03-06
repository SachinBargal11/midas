import { Data } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../environments/environment';
import { SessionStore } from '../../commons/stores/session-store';
import { DiagnosisCode } from '../models/diagnosis-code';
import { DiagnosisType } from '../models/diagnosis-type';
import { DiagnosisCodeAdapter } from './adapters/diagnosis-code-adapter';
import { DiagnosisTypeAdapter } from './adapters/diagnosis-type-adapter';


@Injectable()
export class DiagnosisService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    // getAllDiagnosisTypes(): Observable<DiagnosisType[]> {
    //     let promise: Promise<DiagnosisType[]> = new Promise((resolve, reject) => {
    //         return this._http.get(this._url + '/DiagnosisType/getAll', {
    //             headers: this._headers
    //         })
    //             .map(res => res.json())
    //             .subscribe((data: Array<Object>) => {
    //                 let diagnosisTypes = (<Object[]>data).map((data: any) => {
    //                     return DiagnosisTypeAdapter.parseResponse(data);
    //                 });
    //                 resolve(diagnosisTypes);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<DiagnosisType[]>>Observable.fromPromise(promise);
    // }

    getICDTypeCodeByCompanyId(): Observable<any> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/ICDTypeCode/getICDTypeCodeByCompanyId/' + companyId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    getDiagnosisTypeByCompanyIdAndICDTypeId(ICDTypeId: number): Observable<DiagnosisType[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<DiagnosisType[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DiagnosisType/getDiagnosisTypeByCompanyIdAndICDTypeId/' + companyId + '/' + ICDTypeId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let diagnosisTypes = (<Object[]>data).map((data: any) => {
                        return DiagnosisTypeAdapter.parseResponse(data);
                    });
                    resolve(diagnosisTypes);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DiagnosisType[]>>Observable.fromPromise(promise);
    }

    getDiagnosisCodesByCompanyIdAndDiagnosisTypeId(diagnosisTypeId: number): Observable<DiagnosisCode[]> {
        let companyId = this._sessionStore.session.currentCompany.id;
        let promise: Promise<DiagnosisCode[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/DiagnosisCode/GetByCompanyIdAndDiagnosisTypeId/' + companyId + '/' + diagnosisTypeId, {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((data: Array<Object>) => {
                    let diagnosisCodes = (<Object[]>data).map((data: any) => {
                        return DiagnosisCodeAdapter.parseResponse(data);
                    });
                    resolve(diagnosisCodes);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<DiagnosisCode[]>>Observable.fromPromise(promise);
    }
}