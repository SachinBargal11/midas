import { CompanyAdapter } from '../../account/services/adapters/company-adapter';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { AuthenticationService } from '../../account/services/authentication-service';
import { User } from '../models/user';
import { Session } from '../models/session';
import { Company } from '../../account/models/company';
import { Account } from '../../account/models/account';
import { AccountAdapter } from '../../account/services/adapters/account-adapter';
import * as _ from 'underscore';
import { UserRole } from "../models/user-role";
import { environment } from '../../../environments/environment';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { ConfigService } from '../../config-service';

@Injectable()
export class SessionStore {

    private _identityServerUrl: string = `${environment.IDENTITY_SERVER_URL}`;
    private _homeUrl: string = `${environment.HOME_URL}`;
    private _appDomainUrl: string = `${environment.APP_URL}`;
    private _clientId: string = `${environment.CLIENT_ID}`;
    private _identityScope: string = `${environment.IDENTITY_SCOPE}`;
    @Output() userLogoutEvent: EventEmitter<{}> = new EventEmitter(true);
    @Output() userCompanyChangeEvent: EventEmitter<{}> = new EventEmitter(true);

    private _session: Session = new Session();

    private __ACCOUNT_STORAGE_KEY__ = 'logged_account';
    private __CURRENT_COMPANY__ = 'current_company';
    private __ACCESS_TOKEN__ = 'access_token';
    private __TOKEN_EXPIRES_AT__ = 'token_expires_at';
    private __TOKEN_RESPONSE__ = 'token_response';

    public get session(): Session {
        return this._session;
    }

    constructor(private _authenticationService: AuthenticationService, private _http: Http, private _configService: ConfigService) {
    }

    authenticate() {

        let promise = new Promise((resolve, reject) => {

            let storedAccount: any = window.localStorage.getItem(this.__ACCOUNT_STORAGE_KEY__);
            let storedAccessToken: any = window.localStorage.getItem(this.__ACCESS_TOKEN__);

            if (storedAccount && storedAccessToken) {
                let storedAccountData: any = JSON.parse(storedAccount);
                let account: Account = AccountAdapter.parseStoredData(storedAccountData);
                this._populateSession(account);
                resolve(this._session);
            }
            else {
                reject(new Error('SAVED_AUTHENTICATION_NOT_FOUND'));
            }
        });

        return Observable.from(promise);
    }

    verifyLoginDevice(securityCode: string) {
        let promise = new Promise((resolve, reject) => {
            if (!window.sessionStorage.getItem('logged_user_with_pending_security_review')) {
                reject(new Error('INVALID_REDIRECTION'));
            } else {
                let storedAccountData: any = JSON.parse(window.sessionStorage.getItem('logged_user_with_pending_security_review'));
                let account: Account = AccountAdapter.parseStoredData(storedAccountData);
                let pin = window.sessionStorage.getItem('pin');
                this._authenticationService.validateSecurityCode(account.user.id, securityCode, pin).subscribe(
                    (response: boolean) => {
                        window.localStorage.setItem('device_verified_for' + account.user.userName, moment().toISOString());
                        this._populateSession(account);
                        window.sessionStorage.removeItem('logged_user_with_pending_security_review');
                        resolve(this._session);
                    },
                    (error) => {
                        reject(error);
                    });
            }
        });

        return Observable.from(promise);
    }

    login(userId, password, forceLogin) {
        let promise = new Promise((resolve, reject) => {
            this._authenticationService.authToken(userId, password, forceLogin).subscribe((data: any) => {
                let accessToken = 'bearer ' + data.access_token;
                let tokenExpiresAt = moment().add(data.expires_in - 10, 'seconds');
                // let tokenExpiresAt = moment().add(3600, 'seconds');
                this._authenticationService.authenticate(userId, password, forceLogin, accessToken, tokenExpiresAt).subscribe((account: Account) => {
                    if (!forceLogin) {
                        window.sessionStorage.setItem('logged_user_with_pending_security_review', JSON.stringify(account.toJS()));
                    } else {
                        this._populateSession(account);
                    }
                    resolve(this._session);
                }, (error) => {
                    reject(error);
                });
            }, (error) => {
                reject(error);
            });

        });
        return Observable.from(promise);
    }
    // login(userId, password, forceLogin) {
    //     let promise = new Promise((resolve, reject) => {
    //             let accessToken = '';
    //             this._authenticationService.authenticate(userId, password, forceLogin, accessToken).subscribe((account: Account) => {
    //                 if (!forceLogin) {
    //                     window.sessionStorage.setItem('logged_user_with_pending_security_review', JSON.stringify(account.toJS()));
    //                 } else {
    //                     this._populateSession(account);
    //                 }
    //                 resolve(this._session);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return Observable.from(promise);
    // }

    logout() {
        let tokenResponse = this.session.tokenResponse;
        this.session.account = null;
        // this._resetSession();
        window.localStorage.removeItem(this.__ACCOUNT_STORAGE_KEY__);
        window.localStorage.removeItem(this.__CURRENT_COMPANY__);
        window.localStorage.removeItem(this.__ACCESS_TOKEN__);
        window.localStorage.removeItem(this.__TOKEN_EXPIRES_AT__);
        window.localStorage.removeItem(this.__TOKEN_RESPONSE__);
        window.onbeforeunload = function (e) {
            $.connection.hub.stop();
        };
        if (tokenResponse) {
            let url = this._identityServerUrl + "/core/connect/endsession?post_logout_redirect_uri=" + encodeURIComponent(this._homeUrl) + "&id_token_hint=" + encodeURIComponent(tokenResponse.id_token);
            window.location.assign(url);
        }
    }

    authenticatePassword(userName, oldpassword) {
        let promise = new Promise((resolve, reject) => {
            this._authenticationService.authenticatePassword(userName, oldpassword).subscribe((user: User) => {

                resolve(user);

            }, (error) => {
                reject(error);
            });
        });
        return Observable.from(promise);
    }

    resetDeviceVerification() {
        let promise = new Promise((resolve, reject) => {
            window.sessionStorage.removeItem('logged_user_with_pending_security_review');
            resolve(true);
        });
        return Observable.from(promise);
    }

    private _populateSession(account: Account) {
        this._session.account = account;
        this._session.accessToken = account.accessToken;
        this._session.tokenExpiresAt = account.tokenExpiresAt;
        this._session.tokenResponse = account.tokenResponse ? account.tokenResponse : null;
        let storedCompany: any = JSON.parse(window.localStorage.getItem(this.__CURRENT_COMPANY__));
        let company: Company = CompanyAdapter.parseResponse(storedCompany);
        this._session.currentCompany = company ? company : account.companies[0];
        window.localStorage.setItem(this.__CURRENT_COMPANY__, JSON.stringify(this._session.currentCompany));
        window.localStorage.setItem(this.__ACCOUNT_STORAGE_KEY__, JSON.stringify(account.toJS()));
        window.localStorage.setItem(this.__ACCESS_TOKEN__, account.accessToken);
        window.localStorage.setItem(this.__TOKEN_EXPIRES_AT__, account.tokenExpiresAt);
        window.localStorage.setItem(this.__TOKEN_RESPONSE__, account.tokenResponse ? JSON.stringify(account.tokenResponse) : null);
    }

    private _resetSession() {
        this.session.account = null;
        this.session.currentCompany = null;
        this.session.accessToken = null;
        this.userLogoutEvent.emit(null);
    }

    selectCurrentCompany(event, companyId) {
        event.preventDefault();
        let company: Company = _.find(this.session.companies, { id: parseInt(companyId, 10) });
        this._session.currentCompany = company;
        window.localStorage.setItem(this.__CURRENT_COMPANY__, JSON.stringify(company));
        this.userCompanyChangeEvent.emit(null);
    }
    isOnlyDoctorRole() {
        let isOnlyDoctorRole: boolean = false;
        let roles: UserRole[] = [];
        roles = (this.session.account && this.session.user) ? this.session.user.roles : [];
        if (roles) {
            if (roles.length === 1) {
                let doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
                if (doctorRoleOnly) {
                    isOnlyDoctorRole = true;
                } else {
                    isOnlyDoctorRole = false;
                }
            } else {
                isOnlyDoctorRole = false;
            }
        }
        return isOnlyDoctorRole;
    }

    getToken() {
        var authorizationUrl = this._identityServerUrl + '/core/connect/authorize';
        var redirect_uri = window.location.protocol + "//" + window.location.host + "/";
        var response_type = "id_token token";
        var scope = this._identityScope;
        var client_id = this._clientId

        var state = this.rand();
        var nonce = this.rand();
        localStorage["state"] = state;
        localStorage["nonce"] = nonce;

        var url =
            authorizationUrl + "?" +
            "client_id=" + encodeURI(client_id) + "&" +
            "redirect_uri=" + encodeURI(redirect_uri) + "&" +
            "response_type=" + encodeURI(response_type) + "&" +
            "scope=" + encodeURI(scope) + "&" +
            "state=" + encodeURI(state) + "&" +
            "nonce=" + encodeURI(nonce);
        url;
        window.location.assign(url);
    }
    public Load() {
        debugger
        var result: any;
        if (window.location.hash.search("#/") == -1 && window.location.hash != '') {
            var hash = window.location.hash.substr(1);
            result = hash.split('&').reduce(function (result, item) {
                var parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
            window.location.assign(window.location.protocol + "//" + window.location.host + '/#/');
            var metadata_url = this._identityServerUrl + '/core/.well-known/openid-configuration';
            let promise = new Promise((resolve, reject) => {
                this.getJson(metadata_url, null)
                    .subscribe((metadata: any) => {
                        metadata = metadata;
                        let promise = new Promise((resolve, reject) => {
                            this.getJson(metadata.userinfo_endpoint, result.access_token).subscribe((userInfo) => {

                                let storedAccount: any = window.localStorage.getItem(this.__ACCOUNT_STORAGE_KEY__);
                                let storedAccessToken: any = window.localStorage.getItem(this.__ACCESS_TOKEN__);
                                let storedTokenExpiresAt: any = window.localStorage.getItem(this.__TOKEN_EXPIRES_AT__);
                                if (this.session.account == null && storedAccount == null && storedAccessToken == null && storedTokenExpiresAt == null) {
                                    let promise = new Promise((resolve, reject) => {
                                        let accessToken: any = 'bearer ' + result.access_token;
                                        let tokenExpiresAt: any = moment().add(parseInt(result.expires_in), 'seconds').toString();
                                        this._authenticationService.signinWithUserName(environment.SERVICE_BASE_URL, userInfo.email, accessToken, tokenExpiresAt, result)
                                            .subscribe((accountData) => {
                                                let account: Account = AccountAdapter.parseStoredData(accountData);
                                                this._populateSession(account);
                                                window.location.assign(window.location.protocol + "//" + window.location.host + '/#/dashboard');
                                                resolve(account);
                                            }, error => {
                                                let url = this._identityServerUrl + "/core/connect/endsession?post_logout_redirect_uri=" + encodeURIComponent(this._homeUrl) + "&id_token_hint=" + encodeURIComponent(result.id_token);
                                                window.location.assign(url);
                                                // window.location.assign(this._homeUrl);
                                                reject(error);
                                            });
                                    });
                                    // window.location.assign(this._mpAppDomainUrl + '/#/dashboard');
                                    return Observable.fromPromise(promise);
                                } else {
                                    this._populateTokenSession(result);
                                }
                                resolve(userInfo);
                            }, error => {
                                let url = this._identityServerUrl + "/core/connect/endsession?post_logout_redirect_uri=" + encodeURIComponent(this._homeUrl) + "&id_token_hint=" + encodeURIComponent(result.id_token);
                                window.location.assign(url);
                                // window.location.assign(this._homeUrl);
                                reject(error);
                            });
                        });
                        resolve(metadata);
                    }, error => {
                        let url = this._identityServerUrl + "/core/connect/endsession?post_logout_redirect_uri=" + encodeURIComponent(this._homeUrl) + "&id_token_hint=" + encodeURIComponent(result.id_token);
                        window.location.assign(url);
                        // window.location.assign(this._homeUrl);
                        reject(error);
                    });
            });
        } else {
            let storedAccount: any = window.localStorage.getItem(this.__ACCOUNT_STORAGE_KEY__);
            let storedAccessToken: any = window.localStorage.getItem(this.__ACCESS_TOKEN__);
            let storedTokenExpiresAt: any = window.localStorage.getItem(this.__TOKEN_EXPIRES_AT__);
            if (storedAccount != null && storedAccessToken != null && storedTokenExpiresAt != null) {
                let storedAccountData: any = JSON.parse(storedAccount);
                let account: Account = AccountAdapter.parseStoredData(storedAccountData);
                this._populateSession(account)
                if (window.location.hash != '' && window.location.hash != '#/404') {
                    window.location.assign(window.location.href);
                } else {
                    window.location.assign(window.location.protocol + "//" + window.location.host + '/#/dashboard');
                }
            } else {
                this.getToken();
            }
        }
    }
    private _populateTokenSession(result) {
        let promise = new Promise((resolve, reject) => {
            let storedAccount: any = window.localStorage.getItem(this.__ACCOUNT_STORAGE_KEY__);
            let storedAccessToken: any = 'bearer ' + result.access_token;
            let storedTokenExpiresAt: any = moment().add(parseInt(result.expires_in), 'seconds').toString();

            if (storedAccount && storedAccessToken && storedTokenExpiresAt) {
                let storedAccountData: any = JSON.parse(storedAccount);
                let accountData: Account = AccountAdapter.parseResponse(storedAccountData.originalResponse, storedAccessToken, storedTokenExpiresAt, result);
                let account: Account = AccountAdapter.parseStoredData(accountData);
                this._populateSession(account);
                resolve(this._session);
                window.location.assign(window.location.protocol + "//" + window.location.host + '/#/dashboard');
            }
            else {
                reject(new Error('SAVED_AUTHENTICATION_NOT_FOUND'));
                let url = this._identityServerUrl + "/core/connect/endsession?post_logout_redirect_uri=" + encodeURIComponent(this._homeUrl) + "&id_token_hint=" + encodeURIComponent(result.id_token);
                window.location.assign(url);
            }
        });
        window.location.assign(window.location.protocol + "//" + window.location.host + '/#/dashboard');
        return Observable.from(promise);
    }
    rand() {
        return (Date.now() + "" + Math.random()).replace(".", "");
    }
    getJson(url, token) {
        let headers = new Headers();
        if (token) {
            headers.append("Authorization", "Bearer " + token);
        }
        return this._http.get(url, {
            headers: headers
        }).map(res => res.json());
    }
}
export function tokenServiceFactory(config: SessionStore) {
    return () => config.Load();
}
