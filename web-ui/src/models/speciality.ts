import { Record } from 'immutable';
import moment from 'moment';

const SpecialityRecord = Record({
    id: 0,
    name: '',
    specialityCode: '',
    isunitApply: false,
    isDeleted: 0,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null
});

export class Speciality extends SpecialityRecord {
    id: number;
    name: string;
    specialityCode: string;
    isunitApply: boolean;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

    get displayName(): string {
        return `${this.specialityCode} - ${this.name}`;
    }
}