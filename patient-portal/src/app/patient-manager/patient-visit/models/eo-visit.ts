import { Case } from '../../cases/models/case';
import { IEventWrapper } from '../../../commons/models/i-event-wrapper';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';
import { VisitStatus } from './enums/visit-status';
import { Patient } from '../../../patient-manager/patients/models/patient';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Company } from '../../../account/models/company';
const EoVisitRecord = Record({
    id: 0,
    calendarEventId: 0,
    location: null,
    locationId: 0,
    isEoVisitType: true,
    doctor: null,
    doctorId: 0,
    insuranceProviderId: null,
    VisitCreatedByCompanyId: null,
    eventStart: null,
    eventEnd: null,
    notes: '',
    visitStatusId: VisitStatus.SCHEDULED,
    calendarEvent: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null,//Moment
    company: null,
    patient:null,
});


export class EoVisit extends EoVisitRecord {

    id: number;
    calendarEventId: number;
    location: Location;
    locationId: number;
    isEoVisitType: boolean;
    doctor: Doctor;
    doctorId: number;
    insuranceProviderId: number;
    VisitCreatedByCompanyId: number;
    eventStart: moment.Moment;
    eventEnd: moment.Moment;
    notes: string;
    visitStatusId: VisitStatus;
    calendarEvent: ScheduledEvent;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    company: Company;
    patient:Patient;

    constructor(props) {
        super(props);
    }

    get isOriginalVisit(): boolean {
        return !this.eventStart ? true : false;
    }

    get isExistingVisit(): boolean {
        return !this.isOriginalVisit;
    }

    get eventColor(): string {
        return '#7A3DB8';
    }

     get visitStatusLabel(): string {
        return EoVisit.getvisitStatusLabel(this.visitStatusId);
    }

    static getvisitStatusLabel(visitStatus: VisitStatus): string {
        switch (visitStatus) {
            case VisitStatus.SCHEDULED:
                return 'Scheduled';
            case VisitStatus.COMPLETE:
                return 'Complete';
            case VisitStatus.RESCHEDULE:
                return 'Rescheduled';
            case VisitStatus.NOSHOW:
                return 'Noshow';
        }
    }

    get visitDisplayString(): string {
        let visitInfo: string = `EO Visit`;        return visitInfo;
    }
}