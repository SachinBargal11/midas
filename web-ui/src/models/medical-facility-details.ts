import {Record, List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import {Account} from './account';
import {MedicalFacility} from './medical-facility';
import {User} from './user';
import {Address} from './address';
import {ContactInfo} from './contact';
import {SpecialityDetail} from './speciality-details';

const MedicalFacilityRecord = Record({

    account: null, //Account
    user: null, //User
    address: null, //Address
    contactInfo: null, //Contact
    medicalfacility: null, //MedicalFacility
    specialityDetails: new BehaviorSubject<List<SpecialityDetail>>(List<SpecialityDetail>([]))
});

export class MedicalFacilityDetail extends MedicalFacilityRecord {

    account: Account;
    user: User;
    address: Address;
    contactInfo: ContactInfo;
    medicalfacility: MedicalFacility;
    specialityDetails: BehaviorSubject<List<SpecialityDetail>>;

    constructor(props) {
        super(props);
    }

}