import { Record } from 'immutable';
import * as moment from 'moment';
import { User } from '../../../commons/models/user';
import { DoctorSpeciality } from './doctor-speciality';
import { DoctorLocationSchedule } from './doctor-location-schedule';

const DoctorRecord = Record({
    id: 0,
    licenseNumber: '',
    wcbAuthorization: '',
    wcbRatingCode: '',
    npi: '',
    taxType: '',
    title: '',
    userId: 0,
    user: null,
    doctorSpecialities: null,
    doctorLocationSchedules: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class Doctor extends DoctorRecord {

    id: number;
    licenseNumber: string;
    wcbAuthorization: string;
    wcbRatingCode: string;
    npi: string;
    taxType: string;
    title: string;
    userId: number;
    user: User;
    doctorSpecialities: DoctorSpeciality[];
    doctorLocationSchedules: DoctorLocationSchedule[]; 
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}