import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Address } from './address';
import { Contact } from './contact';
import { UserRole } from './user-role';
import { UserType } from './enums/user-type';
import { Gender } from './enums/Gender';
import { RoleType } from './enums/roles';

const UserRecord = Record({
    id: 0,
    // name: '',
    userType: UserType.STAFF,
    roles: null,
    accountId: 0,
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: Gender.MALE,
    imageLink: '',
    address: null, //Address
    contact: null, //Contact
    dateOfBirth: moment(),
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    // createDate: null, //Moment
    // updateDate: null //Moment
});

export class User extends UserRecord {

    id: number;
    // name: string;
    userType: UserType;
    roles: UserRole[];
    accountId: number;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: Gender;
    imageLink: string;
    address: Address;
    contact: Contact;
    dateOfBirth: moment.Moment;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    // createDate: moment.Moment;
    // updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

    get userTypeLabel(): string {
        return User.getUserTypeLabel(this.userType);
    }

    get displayName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    static getUserTypeLabel(userType: UserType): string {
        switch (userType) {
            case UserType.PATIENT:
                return 'Patient';
            case UserType.STAFF:
                return 'Staff';
        }
    }

    get userRole(): string {
        let roleString: string = null;
        let userRoles: any = [];
        _.forEach(this.roles, (currentRole: UserRole) => {
            userRoles.push(currentRole.name);
        });
        if (userRoles.length > 0) {
            roleString = userRoles.join(', ');
        }
        return roleString;
    }

    get genderLabel(): string {
        return User.getGender(this.gender);
    }

    static getGender(genderStatus: Gender): string {
        switch (genderStatus) {
            case Gender.MALE:
                return 'Male';
            case Gender.FEMALE:
                return 'Female';
            case Gender.OTHERS:
                return 'Others';

        }
    }

}