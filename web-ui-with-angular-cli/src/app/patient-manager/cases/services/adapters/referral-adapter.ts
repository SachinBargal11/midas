import { CaseAdapter } from './case-adapter';
import * as moment from 'moment';
import { Referral } from '../../models/referral';
import { DoctorAdapter } from '../../../../medical-provider/users/services/adapters/doctor-adapter';
import { LocationAdapter } from '../../../../medical-provider/locations/services/adapters/location-adapter';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';

export class ReferralAdapter {
    static parseResponse(data: any): Referral {

        let referral = null;
        if (data) {
            referral = new Referral({
                id: data.id,
                caseId: data.caseId,
                referringCompanyId: data.referringCompanyId,
                referringLocationId: data.referringLocationId,
                referringDoctorId: data.referringDoctorId,
                referredToCompanyId: data.referredToCompanyId,
                referredToLocationId: data.referredToLocationId,
                referredToDoctorId: data.referredToDoctorId,
                referredToRoomId: data.referredToRoomId,
                note: data.note,
                referredByEmail: data.referredByEmail,
                referredToEmail: data.referredToEmail,
                referralAccepted: data.referralAccepted,
                case: CaseAdapter.parseResponse(data.case),
                referringDoctor: DoctorAdapter.parseResponse(data.referringDoctor),
                referringLocation: LocationAdapter.parseResponse(data.referringLocation),
                referringCompany: CompanyAdapter.parseResponse(data.referringCompany),
                referredToDoctor: DoctorAdapter.parseResponse(data.referredToDoctor),
                referredToLocation: LocationAdapter.parseResponse(data.referredToLocation),
                referredToCompany: CompanyAdapter.parseResponse(data.referredToCompany),
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return referral;
    }
}
