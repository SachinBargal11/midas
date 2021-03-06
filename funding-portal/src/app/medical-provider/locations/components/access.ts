import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';

@Component({
    selector: 'access',
    templateUrl: './access.html'
})

export class AccessComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    accessform: FormGroup;
    accessformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.accessform = this.fb.group({
            role: ['']
        });

        this.accessformControls = this.accessform.controls;
    }

    ngOnInit() {
    }


    save() {
        // let accessformValues = this.accessform.value;
    }

}
