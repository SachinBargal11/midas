import { AccountAdapter } from './adapters/account-adapter';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import { AccountDetail } from '../models/account-details';
import { User } from '../models/user';
import { UserAdapter } from './adapters/user-adapter';
import _ from 'underscore';
import { Account } from '../models/account';
import { AccountStatus } from '../models/enums/account-status';
import { UserType } from '../models/enums/user-type';

@Injectable()
export class AuthenticationService {
    companies: any[];
    private _url: string = `${Environment.SERVICE_BASE_URL}`;

    constructor(private _http: Http) { }

    register(accountDetail: AccountDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let accountDetailRequestData;
            try {
                accountDetailRequestData = accountDetail.toJS();

                // add/replace values which need to be changed
                _.extend(accountDetailRequestData.user, {
                    userType: UserType[accountDetailRequestData.user.userType],
                    dateOfBirth: accountDetailRequestData.user.dateOfBirth ? accountDetailRequestData.user.dateOfBirth.toISOString() : null
                });

                _.extend(accountDetailRequestData.account, {
                    status: AccountStatus[accountDetailRequestData.account.status]
                });

                // remove unneeded keys 
                accountDetailRequestData.user = _.omit(accountDetailRequestData.user, 'accountID', 'gender', 'status', 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                accountDetailRequestData.address = _.omit(accountDetailRequestData.address, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                accountDetailRequestData.contactInfo = _.omit(accountDetailRequestData.contactInfo, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');
                accountDetailRequestData.account = _.omit(accountDetailRequestData.account, 'createByUserID', 'createDate', 'updateByUserID', 'updateDate');

            } catch (error) {
                reject(error);
            }

            return this._http.post(this._url + '/Account/Signup', JSON.stringify(accountDetailRequestData), {
                headers: headers
            })
                .map(res => res.json())
                .subscribe((data: any) => {
                    if (data.errorMessage) {
                        reject(new Error(data.errorMessage));
                    } else {
                        resolve(data);
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    GeneratePasswordResetLink(userDetail: any): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/PasswordToken/GeneratePasswordResetLink', JSON.stringify(userDetail), {
                headers: headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    resolve(userData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }

    checkForValidResetPasswordToken(autheticateRequestData) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/PasswordToken/ValidatePassword', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
                    }
                    else {
                        reject(new Error('INVALID_TOKEN'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }


    checkForValidToken(token) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            let autheticateRequestData = {

                appKey: token

            };
            return this._http.post(this._url + '/Company/ValidateInvitation', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
                    }
                    else {
                        reject(new Error('INVALID_TOKEN'));
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updatePassword(userDetail: any): Observable<any> {
        userDetail.role = {
            name: 'Doctor',
            roleType: 'Admin',
            status: 'active'
        };
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post(this._url + '/User/Add', JSON.stringify(userDetail), {
                headers: headers
            })
                .map(res => res.json())
                .subscribe((userData: any) => {
                    resolve(userData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);

    }

    authenticate(email: string, password: string, forceLogin: boolean): Observable<Account> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<Account> = new Promise((resolve, reject) => {
            let autheticateRequestData = {
                'userName': email,
                'password': password,
                'forceLogin': forceLogin
            };
            return this._http.post(this._url + '/User/Signin', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        // data.company = data.usercompanies[0].company;
                        let user = AccountAdapter.parseResponse(data);
                        window.sessionStorage.setItem('pin', data.pin);
                        resolve(user);
                    }
                    else {
                        reject(new Error('INVALID_CREDENTIALS'));
                    }
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<Account>>Observable.fromPromise(promise);
    }

    authenticatePassword(userName: string, oldpassword: string): Observable<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            let autheticateRequestData = {
                user: {
                    'userName': userName,
                    'password': oldpassword
                }
            };
            return this._http.post(this._url + '/User/Signin', JSON.stringify(autheticateRequestData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        let user = UserAdapter.parseUserResponse(data);
                        resolve(user);
                    }
                    else {
                        reject(new Error('INVALID_CREDENTIALS'));
                    }
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<User>>Observable.fromPromise(promise);
    }

    generateCode(userId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise: Promise<User> = new Promise((resolve, reject) => {
            let postData = {
                user: {
                    id: userId
                }
            };
            return this._http.post(this._url + '/OTP/GenerateOTP', JSON.stringify(postData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    window.sessionStorage.setItem('pin', data.pin);
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });

        return <Observable<any>>Observable.fromPromise(promise);
    }

    validateSecurityCode(userId, code, pin) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let promise = new Promise((resolve, reject) => {
            let postData = {
                otp: {
                    otp: code,
                    pin: pin
                },
                user: {
                    id: userId
                }
            };

            return this._http.post(this._url + '/OTP/ValidateOTP', JSON.stringify(postData), {
                headers: headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<boolean>>Observable.fromPromise(promise);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}