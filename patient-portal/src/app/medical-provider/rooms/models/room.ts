import { Record } from 'immutable';
import { Tests } from './tests';
import { LocationDetails } from '../../locations/models/location-details';
import { Schedule } from './rooms-schedule';

const RoomRecord = Record({
    id: 0,
    name: '',
    contactPersonName: '',
    phone: '',
    roomTest: null,
    location: null,
    schedule: null,
    isDeleted: false
});

export class Room extends RoomRecord {

    id: number;
    name: string;
    contactPersonName: string;
    phone: string;
    roomTest: Tests;
    location: LocationDetails;
    schedule: Schedule;
    isDeleted: boolean;

    constructor(props) {
        super(props);
    }

}