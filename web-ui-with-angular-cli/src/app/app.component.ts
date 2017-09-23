import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from './commons/stores/session-store';
import { NotificationsStore } from './commons/stores/notifications-store';
import { ProgressBarService } from './commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
// import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Notification } from './commons/models/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  dateNow;
  options = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: false
  };
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private _router: Router,
    public sessionStore: SessionStore,
    public notificationsStore: NotificationsStore,
    private _notificationsService: NotificationsService,
    public progressBarService: ProgressBarService,
    private cdRef: ChangeDetectorRef,
    // private idle: Idle,
    // private keepalive: Keepalive

  ) {
    // // sets an idle timeout of 5 seconds, for testing purposes.
    // idle.setIdle(5);
    // // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    // idle.setTimeout(10);
    // // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => {
    //   this.idleState = 'No longer idle.'
    //   this.checkValidToken();
    // });

    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    //   // this.sessionStore.logout();
    //   this.checkValidToken();
    //   // this._router.navigate(['/account/login']);
    // });

    // idle.onIdleStart.subscribe(() => {
    //   this.idleState = 'You\'ve gone idle!'
    // });

    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.idleState = 'You will time out in ' + countdown + ' seconds!'
    // });

    // // sets the ping interval to 15 seconds
    // keepalive.interval(15);
    // keepalive.onPing.subscribe(() => {
    //   this.lastPing = new Date()
    // });
    // this.reset();
  // }

  // reset() {
  //   this.idle.watch();
  //   this.idleState = 'Started.';
  //   this.timedOut = false;
  }

  ngOnInit() {

    this.sessionStore.authenticate().subscribe(
      (response) => {
      },
      error => {
        // this._router.navigate(['/account/login']);
      }
    );
    // this._specialityStore.getSpecialities();
    // this._statesStore.getStates();
  }

  checkValidToken() {
    let now = moment().add(120, 'seconds');
    if(this.sessionStore.session.tokenExpiresAt < now) {
      this.sessionStore.refreshToken();
    }
  }

  // To remove Expression changed error
  ngAfterViewChecked() {
    // console.log( "! Expression has been changed !" );
    this.dateNow = new Date();
    this.cdRef.detectChanges();
  }

}
