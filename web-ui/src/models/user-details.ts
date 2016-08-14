import {Record} from 'immutable';
import moment from 'moment';
import {User} from './user';
import {Address} from './address';
import {Contact} from './contact';
import {Account} from './account';

const UserDetailRecord = Record({

    account: null,
    user: null, //Address
    address: null, //Address
    contactInfo: null, //Contact

});

export class UserDetail extends UserDetailRecord {

    account: Account;
    user: User;
    address: Address;
    contact: Contact;


    constructor(props) {
        super(props);
    }

}
