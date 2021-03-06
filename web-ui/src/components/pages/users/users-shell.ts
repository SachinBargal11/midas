import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../stores/session-store';

@Component({
    selector: 'user-shell',
    templateUrl: 'templates/pages/users/users-shell.html'
})

export class UserShellComponent implements OnInit {

    constructor(
        public router: Router,
        public _route: ActivatedRoute,
        private _sessionStore: SessionStore
    ) {

    }

    ngOnInit() {

    }

}