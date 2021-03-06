import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ReferralStore } from '../../cases/stores/referral-store';
import { Referral } from '../../cases/models/referral';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Consent } from '../../cases/models/consent';
import { ReferralDocument } from '../../cases/models/referral-document';
import { environment } from '../../../../environments/environment';
import { CaseDocument } from '../../cases/models/case-document';

@Component({
    selector: 'inbound-referrals',
    templateUrl: './inbound-referrals.html',
    styleUrls: ['./inbound-referrals.scss']
})

export class InboundReferralsComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: boolean = false;
    consentNotRecived: boolean = false;
    searchMode: number = 1;
    referrals: Referral[];
    referredUsers: Referral[];
    referredMedicalOffices: Referral[];
    referredRooms: Referral[];
    filters: SelectItem[];
    doctorRoleOnly = null;
    display: boolean = false; 

    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _referralStore: ReferralStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
    ) {
        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadReferralsCheckingDoctor();
        });
    }

    ngOnInit() {
        let roles = this.sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                this.doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
        }
        this.loadReferralsCheckingDoctor();
    }
    loadReferralsCheckingDoctor() {
        // let doctorRoleOnly = null;        
            if (this.doctorRoleOnly) {
                this.loadReferralsForDoctor();
            } else {
                this.loadReferrals();
            }
    }
    loadReferralsForDoctor() {
        this._progressBarService.show();
        this._referralStore.getReferralsByReferredToDoctorId()
            .subscribe((referrals: Referral[]) => {
                this.referrals = referrals.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });        
    }
    loadReferrals() {
        this._progressBarService.show();
        this._referralStore.getReferralsByReferredToCompanyId()
            .subscribe((referrals: Referral[]) => {
                // this.referrals = referrals.reverse();
                let userReferrals: Referral[] = _.map(referrals, (currentReferral: Referral) => {
                    return currentReferral.referredToDoctor ? currentReferral : null;
                });
                let matchingUserReferrals = _.reject(userReferrals, (currentReferral: Referral) => {
                    return currentReferral == null;
                });
                this.referredUsers = matchingUserReferrals;

                let roomReferrals: Referral[] = _.map(referrals, (currentReferral: Referral) => {
                    return currentReferral.room ? currentReferral : null;
                });
                let matchingRoomReferrals = _.reject(roomReferrals, (currentReferral: Referral) => {
                    return currentReferral == null;
                });
                this.referredRooms = matchingRoomReferrals;

                let userAndRoomReferral = _.union(matchingUserReferrals, matchingRoomReferrals);
                let userAndRoomReferralIds: number[] = _.map(userAndRoomReferral, (currentUserAndRoomReferral: Referral) => {
                    return currentUserAndRoomReferral.id;
                });
                let matchingMedicalOffices = _.filter(referrals, (currentReferral: Referral) => {
                    return _.indexOf(userAndRoomReferralIds, currentReferral.id) < 0 ? true : false;
                });
                this.referredMedicalOffices = matchingMedicalOffices;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    filter(event) {
        let currentSearchId = parseInt(event.target.value);
        if (currentSearchId === 1) {
            this.searchMode = 1;
        } else if (currentSearchId === 2) {
            this.searchMode = 2;
        } else if (currentSearchId === 3) {
            this.searchMode = 3;
        }
    }
    DownloadPdf(document: ReferralDocument) {
        window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
    }
    downloadConsent(caseDocuments: CaseDocument[]) {
        caseDocuments.forEach(caseDocument => {
            window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
        });
    }
    // consentAvailable(referral: Referral) {
    //     if (referral.case.companyCaseConsentApproval.length > 0) {
    //         let consentAvailable = _.find(referral.case.companyCaseConsentApproval, (currentConsent: Consent) => {
    //             return currentConsent.companyId === this._sessionStore.session.currentCompany.id;
    //         });
    //         if (consentAvailable) {
    //             return this.consentRecived = 'Yes';
    //         } else {
    //             return this.consentRecived = 'No';
    //         }
    //     } else {
    //         return this.consentRecived = 'No';
    //     }
    // }
    consentAvailable(referral: Referral) {
                this.consentNotRecived = false;
                this.consentRecived = false;
                let consentAvailable = null;
        if (referral.case.companyCaseConsentApproval.length > 0) {
            _.forEach(referral.case.companyCaseConsentApproval, (currentConsent: Consent) => {
                if (currentConsent.companyId === this.sessionStore.session.currentCompany.id) {this.consentRecived = true 
                } else  this.consentRecived = false;
            });
            // referral.case.companyCaseConsentApproval.forEach(currentConsent => {
            //     if(currentConsent.companyId === this._sessionStore.session.currentCompany.id) {
            //          this.consentRecived = true;
            //          return;
            //     } else {
            //         this.consentNotRecived = true;
            //         return;                    
            //     }               
            // });
            // if (consentAvailable) {
            //     this.consentRecived = true;
            //     return;
            // } else {
            //     this.consentNotRecived = true;
            //     return;
            // }
        } else {
            this.consentNotRecived = true;
            return;
        }
    }
}
