import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsStore } from '../stores/patients-store';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'patients-shell',
    templateUrl: './patients-shell.html'
})

export class PatientsShellComponent implements OnInit {

    constructor(
        public _router: Router,
        private _patientsStore: PatientsStore,
        public sessionStore: SessionStore,
    ) {

    }

    ngOnInit() {

    }

}