import {Record} from 'immutable';
import moment from 'moment';
import {Account} from './account';
import {User} from './user';
import {Address} from './address';
import {Contact} from './contact';

const AccountDetailRecord = Record({

    account: null, //Account
    user: null, //User
    address: null, //Address
    contactInfo: null, //Contact

});

export class AccountDetail extends AccountDetailRecord {

    account: Account;
    user: User;
    address: Address;
    contact: Contact;


    constructor(props) {
        super(props);
    }

}