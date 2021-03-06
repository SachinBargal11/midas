import {Record} from 'immutable';
import * as moment from 'moment';
import { PreferredCommunication } from './enums/preferred-communication';

const ContactRecord = Record({
    id: 0,
    name: '',
    cellPhone: '',
    emailAddress: '',
    homePhone: '',
    workPhone: '',
    faxNo: '',
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null, //Moment
    alternateEmail: '',
    officeExtension: '',
    preferredCommunication: PreferredCommunication.CELLPHONE,

});

export class Contact extends ContactRecord {

    id: number;
    name: string;
    cellPhone: string;
    emailAddress: string;
    homePhone: string;
    workPhone: string;
    faxNo: string;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    alternateEmail: string;
    officeExtension: string;
    preferredCommunication: PreferredCommunication;

    constructor(props) {
        super(props);
    }
}