import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {SessionStore} from '../../stores/session-store';


@Injectable()
export class ValidateInActiveSession implements CanActivate {
    constructor(private _sessionStore: SessionStore, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this._sessionStore.session.isAuthenticated) {
            return true;
        }

        this._router.navigate(['/dashboard']);
        return false;
    }
}