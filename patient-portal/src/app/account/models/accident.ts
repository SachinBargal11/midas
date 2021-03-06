import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../commons/models/address';
import { PatientType } from './enums/patient-type';

const AccidentRecord = Record({
    id: 0,
    patientId: 0,
    accidentAddress: null,
    hospitalAddress: null,
    accidentDate: moment(),
    plateNumber: '',
    reportNumber: '',
    hospitalName: '',
    describeInjury: '',
    dateOfAdmission: moment(),
    patientTypeId: '1',
    additionalPatients: '',
    isCurrentAccident: true,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Accident extends AccidentRecord {

    id: number;
    accidentAddress: Address;
    hospitalAddress: Address;
    accidentDate: moment.Moment;
    plateNumber: string;
    reportNumber: string;
    hospitalName: string;
    describeInjury: string;
    dateOfAdmission: moment.Moment;
    patientTypeId: PatientType;
    additionalPatients: string;
    isCurrentAccident: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}