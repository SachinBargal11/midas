import {Record} from 'immutable';
import {User} from './user';

const SessionRecord = Record({
    user: null,
    isSecurityCheckVerified: false
});

export class Session extends SessionRecord {

    private _user: User = null;

    public get user(): User {
        return this._user;
    }

    public set user(value: User) {
        debugger;
        this._user = value;
    }

    get isAuthenticated() {
        return this.user ? true : false;
    }

    public get displayName(): string {
        return this._user.firstName + ' ' + this._user.lastName;
    }

    public get account_id(): number {
        return this._user.accountId;
    }


}