import {Record} from 'immutable';
import {User} from './user';
import {Address} from './address';
import {Contact} from './contact';
import {Doctor} from './doctor';

const DoctorDetailRecord = Record({

    doctor: null,
    user: null,
    address: null, //Address
    contactInfo: null, //Contact

});

export class DoctorDetail extends DoctorDetailRecord {

    doctor: Doctor;
    user: User;
    address: Address;
    contactInfo: Contact;


    constructor(props) {
        super(props);
    }

}
