import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { CaseType } from './enums/case-types';
import { CaseStatus } from './enums/case-status';
import { Company } from '../../../account/models/company';
import { Consent } from './consent';
import { Referral } from './referral';
import { Patient } from '../../patients/models/patient';
import { CaseDocument } from './case-document';
import { CaseCompanyMapping } from './caseCompanyMapping';

const CaseRecord = Record({
    id: 0,
    patientId: 0,
    patient: null,
    caseName: '',
    caseTypeId: CaseType.NOFAULT,
    // companies: null,
    caseCompanyConsentDocument: null,
    companyCaseConsentApproval: null,
    referral: null,
    locationId: 0,
    patientEmpInfoId: null,
    carrierCaseNo: '',
    claimFileNumber:0,
    // transportation: true,
    caseStatusId: CaseStatus.OPEN,
    attorneyId: 0,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null,
    caseSource: null,
    createdByCompanyId: 0,
    createdByCompany: null,
    orignatorCompanyId: 0,
    caseCompanyMapping: null,
    orignatorCompanyName: '',
    attorneyProviderId:0,
    medicalProviderId:0,
    medicare:false,
    medicaid:false,
    ssdisabililtyIncome:false


});

export class Case extends CaseRecord {

    id: number;
    patient: Patient;
    patientId: number;
    caseName: string;
    caseTypeId: CaseType;
    // companies: Company[];
    caseCompanyConsentDocument: CaseDocument[];
    companyCaseConsentApproval: Consent[];
    referral: Referral[];
    locationId: number;
    patientEmpInfoId: number;
    carrierCaseNo: string;
    // transportation: boolean;
    caseStatusId: CaseStatus;
    attorneyId: number;
    claimFileNumber: number;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    caseSource: string;
    createdByCompanyId: number;
    createdByCompany: Company;
    caseCompanyMapping: CaseCompanyMapping[];
    orignatorCompanyId: number;
    orignatorCompanyName: string;
    attorneyProviderId:number;
    medicalProviderId:number;
    medicare:boolean;
    medicaid:boolean;
    ssdisabililtyIncome:boolean;
    constructor(props) {
        super(props);
    }

    get caseTypeLabel(): string {
        return Case.getCaseTypeLabel(this.caseTypeId);
    }
    // tslint:disable-next-line:member-ordering
    static getCaseTypeLabel(caseType: CaseType): string {
        switch (caseType) {
            case CaseType.NOFAULT:
                return 'No Fault';
            case CaseType.WC:
                return 'WC';
            case CaseType.PRIVATE:
                return 'Private';
            case CaseType.LIEN:
                return 'Lien';
        }
    }


    get caseStatusLabel(): string {
        return Case.getCaseStatusLabel(this.caseStatusId);
    }
    // tslint:disable-next-line:member-ordering
    static getCaseStatusLabel(caseStatus: CaseStatus): string {
        switch (caseStatus) {
            case CaseStatus.OPEN:
                return 'Open';
            case CaseStatus.CLOSE:
                return 'Close';

        }
    }
    isConsentReceived(companyId): boolean {
        let isConsentReceived: boolean = false;
        _.forEach(this.companyCaseConsentApproval, (currentConsent: Consent) => {
            if (currentConsent.companyId === companyId) {
                isConsentReceived = true;
            }
        });
        return isConsentReceived;
    }
    isCreatedByCompany(companyId): boolean {
        let isCreatedByCompany: boolean = false;
        if (this.orignatorCompanyId === companyId) {
            isCreatedByCompany = true;
        }
        return isCreatedByCompany;
    }

    caseLabelEditable(companyId): boolean {
        let isCaseLabelEditable: boolean = false;
        // _.forEach(this.caseCompanyMapping, (currentCaseCompanyMapping: CaseCompanyMapping) => {
        //     if (currentCaseCompanyMapping.isOriginator == true && (currentCaseCompanyMapping.company.id === companyId)) {
        //         isCaseLabelEditable = true;
        //     }
        // });
        if (this.orignatorCompanyId == companyId) {
             return isCaseLabelEditable = true;
        }
        return isCaseLabelEditable;
    }


    getInboundReferral(companyId): boolean {
        let isInboundReferral: boolean = false;
        _.forEach(this.referral, (currentReferral: Referral) => {
            if (currentReferral.referredToCompanyId === companyId) {
                isInboundReferral = true;
            }
        });
        return isInboundReferral;
    }
    getOutboundReferral(companyId): boolean {
        let isOutboundReferral: boolean = false;
        _.forEach(this.referral, (currentReferral: Referral) => {
            if (currentReferral.referringCompanyId === companyId) {
                isOutboundReferral = true;
            }
        });
        return isOutboundReferral;
    }
    isSessionCompany(companyId): boolean {
        let isSessionCompany: boolean = false;
        // _.forEach(this.companies, (currentCompany: any) => {
        if (this.orignatorCompanyId === companyId) {
            isSessionCompany = true;
        }
        // });
        return isSessionCompany;
    }


}