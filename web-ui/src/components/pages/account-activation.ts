import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../utils/AppValidators';
import { NotificationsService } from 'angular2-notifications';

import { AuthenticationService } from '../../services/authentication-service';
import { UsersService } from '../../services/users-service';

import { User } from '../../models/user';

@Component({
    selector: 'account-activation',
    templateUrl: 'templates/pages/account-activation.html',
    providers: [FormBuilder, AuthenticationService, NotificationsService]
})

export class AccountActivationComponent implements OnInit {
    token: any;
    user: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
        // maxLength: 10
    };
    changePassForm: FormGroup;
    changePassFormControls;
    isPassChangeInProgress;
    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _usersService: UsersService
    ) {
        this._route.params.subscribe((routeParams: any) => {
            this.token = routeParams.token;
            // let token: number = parseInt(routeParams.token);
            let result = this._authenticationService.checkForValidToken(this.token);
            result.subscribe(
                (data: any) => {
                    // check for response
                    this.user = data.user;
                },
                (error) => {
                    // this._router.navigate(['/login']);
                },
                () => {
                });
        });


        this.changePassForm = this.fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.changePassFormControls = this.changePassForm.controls;
    }

    ngOnInit() {
    }

    updatePassword() {
        let userDetail = ({
            user: {
                id: this.user.id,
                password: this.changePassForm.value.password
            }
        });


        this.isPassChangeInProgress = true;

        let result = this._authenticationService.checkForValidToken(this.token);
        result.subscribe(
            (response) => {
                this._authenticationService.updatePassword(userDetail)
                    .subscribe(
                    (response) => {
                        this._notificationsService.success('Success', 'Password updated successfully!');
                        setTimeout(() => {
                             this._router.navigate(['/login']);
                        }, 3000);
                    });
            },
            error => {
                this._notificationsService.error('Error!', 'Unable to update password.');
            },
            () => {
                this.isPassChangeInProgress = false;
            });
    }

    goBack(): void {
        this.location.back();
    }

}