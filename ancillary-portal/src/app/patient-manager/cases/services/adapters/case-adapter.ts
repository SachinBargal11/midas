import { PatientAdapter } from '../../../patients/services/adapters/patient-adapter';
import { Company } from '../../../../account/models/company';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import * as moment from 'moment';
import { Case } from '../../models/case';
import { Consent } from '../../models/consent';
import { CaseDocument } from '../../models/case-document';
import { ConsentAdapter } from './consent-adapter';
import { CaseDocumentAdapter } from './case-document-adapters';
import { Referral } from '../../models/referral';
import { ReferralAdapter } from './referral-adapter';

export class CaseAdapter {
    static parseResponse(data: any): Case {

        let patient_case = null;
        let companies: Company[] = [];
        let companyCaseConsentApproval: Consent[] = [];
        let caseCompanyConsentDocument: CaseDocument[] = [];
        let referral: Referral[] = [];
        if (data) {
            if (data.caseCompanyMapping) {
                for (let company of data.caseCompanyMapping) {
                    companies.push(CompanyAdapter.parseResponse(company.company));
                }
            }
            if (data.caseCompanyConsentDocument) {
                for (let consentDocument of data.caseCompanyConsentDocument) {
                    caseCompanyConsentDocument.push(CaseDocumentAdapter.parseResponse(consentDocument));
                }
            }
            if (data.companyCaseConsentApproval) {
                for (let consent of data.companyCaseConsentApproval) {
                    companyCaseConsentApproval.push(ConsentAdapter.parseResponse(consent));
                }
            }
            // if (data.referral) {
            //     for (let referral of data.referral) {
            //         referral.push(ReferralAdapter.parseResponse(referral));
            //     }
            // }
            patient_case = new Case({
                id: data.id,
                patientId: data.patientId,
                patient: PatientAdapter.parseResponse(data.patient),
                caseName: data.caseName,
                caseTypeId: data.caseTypeId,
                companies: companies,
                caseCompanyConsentDocument: caseCompanyConsentDocument,
                companyCaseConsentApproval: companyCaseConsentApproval,
                // referral:referral,
                referral: data.referral,
                locationId: data.locationId,
                carrierCaseNo: data.carrierCaseNo,
                // transportation: data.transportation ? true : false,
                // transportation: data.transportation == true ? '1' : data.transportation == false ? '0' : null,
                caseStatusId: data.caseStatusId,
                attorneyId: data.attorneyId,
                patientEmpInfoId: data.patientEmpInfoId,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
                caseSource: data.caseSource,
                createdByCompanyId: data.createdByCompanyId,
                createdByCompany: CompanyAdapter.parseResponse(data.createdByCompany)
            });
        }
        return patient_case;
    }

    static parseCaseComapnyResponse(data: any): Case {
        let patient_case = null;
        let companies: Company[] = [];
        let companyCaseConsentApproval: Consent[] = [];
        let referral: Referral[] = [];
        let caseCompanyConsentDocument: CaseDocument[] = [];
        if (data) {
            if (data.caseCompanyMapping) {
                for (let company of data.caseCompanyMapping) {
                    companies.push(CompanyAdapter.parseResponse(company.company));
                }
            }
            if (data.caseCompanyConsentDocument) {
                for (let consentDocument of data.caseCompanyConsentDocument) {
                    caseCompanyConsentDocument.push(CaseDocumentAdapter.parseResponse(consentDocument));
                }
            }
            if (data.companyCaseConsentApproval) {
                for (let consent of data.companyCaseConsentApproval) {
                    companyCaseConsentApproval.push(ConsentAdapter.parseResponse(consent));
                }
            }
            patient_case = new Case({
                id: data.caseId,
                patient: PatientAdapter.parseResponse({
                    id: data.id,
                    user: {
                        id: data.userId,
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        userName: data.userName
                    }
                }),
                caseName: data.caseName,
                caseTypeId: data.caseTypeId,
                companies: companies,
                locationId: data.locationId,
                carrierCaseNo: data.carrierCaseNo,
                transportation: data.transportation ? true : false,
                caseStatusId: data.caseStatusId,
                attorneyId: data.attorneyId,
                patientEmpInfoId: data.patientEmpInfoId,
                caseCompanyConsentDocument: caseCompanyConsentDocument,
                companyCaseConsentApproval: companyCaseConsentApproval,
                referral: data.referral,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
                caseSource: data.caseSource,
                createdByCompanyId: data.createdByCompanyId,
                createdByCompany: CompanyAdapter.parseResponse(data.createdByCompany)


            });
        }
        return patient_case;
    }
}
