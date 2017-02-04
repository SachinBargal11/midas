import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';
import { Employee } from './employee';
import { Insurance } from './insurance';

const CaseRecord = Record({
    id: 0,
    patientId: 0,
    caseName: '',
    caseTypeId: 0,
    age: 0,
    dateOfInjury: moment(),
    locationId: 0,
    vehiclePlateNo: '',
    carrierCaseNo: 0,
    transportation: 0,
    dateOfFirstTreatment: moment(),
    caseStatusId: 0,
    attorneyId: 0,
    address: null,
    contact: null,
    employee: null,
    insurance: null,
    accidentAddress: null
});

export class Case extends CaseRecord {

    id: number;
    patientId: number;
    caseName: string;
    caseTypeId: number;
    age: number;
    dateOfInjury: moment.Moment;
    locationId: number;
    vehiclePlateNo: string;
    carrierCaseNo: number;
    transportation: boolean;
    dateOfFirstTreatment: moment.Moment;
    caseStatusId: number;
    attorneyId: number;
    address: Address;
    contact: Contact;
    employee: Employee;
    insurance: Insurance;
    accidentAddress: Address;

    constructor(props) {
        super(props);
    }

}