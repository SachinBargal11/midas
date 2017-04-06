import { DoctorSpecialityAdapter } from './doctor-speciality-adapter';
import { DoctorSpeciality } from '../../models/doctor-speciality';
import * as moment from 'moment';
import { Doctor } from '../../models/doctor';
import { UserAdapter } from './user-adapter';
import * as _ from 'underscore';


export class DoctorAdapter {
    static parseDoctorResponse(doctorData: any): Doctor {

        let doctor: Doctor = null;
        if (doctorData) {
            let tempDoctor: any = _.omit(doctorData, 'account', 'updateDate');
            if (doctorData.account) {
                tempDoctor.accountId = doctorData.account.id;
            }
            doctor = new Doctor(_.extend(tempDoctor, {
                createDate: moment.utc(tempDoctor.createDate)
            }));
        }
        return doctor;
    }

    static parseResponse(doctorData: any): Doctor {

        let doctor = null;

        if (doctorData) {
            let doctorSpecialities: DoctorSpeciality[] = [];
            if (doctorData.doctorSpecialities) {
                _.forEach(doctorData.doctorSpecialities, (currentDoctorSpeciality: any) => {
                    doctorSpecialities.push(DoctorSpecialityAdapter.parseResponse(currentDoctorSpeciality));
                });
            }
            doctor = new Doctor({
                id: doctorData.id,
                licenseNumber: doctorData.licenseNumber,
                wcbAuthorization: doctorData.wcbAuthorization,
                wcbRatingCode: doctorData.wcbratingCode,
                npi: doctorData.npi,
                taxType: doctorData.taxType,
                title: doctorData.title,
                user: UserAdapter.parseResponse(doctorData.user),
                doctorSpecialities: doctorSpecialities,
                isDeleted: doctorData.isDeleted
            });
        }
        return doctor;
    }
}