import { UserRole } from '../../commons/models/user-role';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../account/services/authentication-service';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import * as _ from 'underscore';
import { DialogModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UserSettingStore } from '../../commons/stores/user-setting-store';
import { UserSetting } from '../../commons/models/user-setting';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.html',
    styleUrls: ['./app-header.scss']
})

export class AppHeaderComponent implements OnInit {

    doctorRoleFlag = false;
    disabled: boolean = false;
    status: { isopen: boolean } = { isopen: false };
    menu_right_opened: boolean = false;
    menu_left_opened: boolean = false;

    /* Dialog Visibilities */
    settingsDialogVisible: boolean = false;

    addUserSettings: FormGroup;
    addUserSettingsControls;
    isPublicProfile: boolean = false;
    isPublishCalender: boolean = false;

    toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    constructor(
        private _authenticationService: AuthenticationService,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _router: Router,
        private _fb: FormBuilder,
        private _userSettingStore: UserSettingStore,
    ) {
        this.addUserSettings = this._fb.group({
            isPublicProfile: [''],
            isPublishCalender: ['']
        })
        this.addUserSettingsControls = this.addUserSettings.controls;
       // this.isPublicProfile = this.specialityDetail.isPublicProfile;
    }

    ngOnInit() {
        let doctorRolewithOther;
        let doctorRolewithoutOther;
        let roles = this.sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                doctorRolewithoutOther = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            } else if (roles.length > 1) {
                doctorRolewithOther = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
            if (doctorRolewithoutOther) {
                this.doctorRoleFlag = true;
            } else if (doctorRolewithOther) {
                this.doctorRoleFlag = false;
            } else {
                this.doctorRoleFlag = false;
            }
        }

    }
    onLeftBurgerClick() {
        if (document.getElementsByTagName('body')[0].classList.contains('menu-left-opened')) {
            document.getElementsByClassName('hamburger')[0].classList.remove('is-active');
            document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        } else {
            document.getElementsByClassName('hamburger')[0].classList.add('is-active');
            document.getElementsByTagName('body')[0].classList.add('menu-left-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
    }

    onBurgerClick() {
        if (this.menu_right_opened) {
            this.menu_right_opened = false;
            document.getElementsByTagName('body')[0].classList.remove('menu-right-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        } else {
            // this.menu_right_opened = true;
            document.getElementsByClassName('hamburger')[0].classList.remove('is-active');
            document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
            document.getElementsByTagName('body')[0].classList.add('menu-right-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
            this.menu_right_opened = false;
        }
    }

    hideMobileMenu() {
        document.getElementsByTagName('body')[0].classList.remove('menu-right-opened');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

    logout() {
        this.sessionStore.logout();
        this._router.navigate(['/account/login']);
    }

    changePassword() {
        this._router.navigate(['/account/change-password']);
    }

    showNotifications() {
        this._notificationsStore.toggleVisibility();
    }

    showSettingsDialog() {
        this.settingsDialogVisible = true;
        // this._cd.detectChanges();
    }
    closeDialog() {
        this.isPublicProfile = false;
        this.isPublishCalender = false;
        this.settingsDialogVisible = false;
    }

    saveUserSettings() {       
        let userSettingsValues = this.addUserSettings.value;
        let result;
        let userSetting = new UserSetting(
            {
                isPublicProfile: userSettingsValues.isPublicProfile,
                isPublishCalender: userSettingsValues.isPublishCalender
            }
        )
        //  this._progressBarService.show();
        result = this._userSettingStore.saveUserSetting();

    }
}