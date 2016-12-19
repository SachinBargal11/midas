import { Record } from 'immutable';
import moment from 'moment';

const ProviderRecord = Record({
    id: 0,
    name: '',
    npi: '',
    federalTaxID: '',
    prefix: '',
    providerMedicalFacilities: '',
    isDeleted: 0,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null
});

export class Provider extends ProviderRecord {
    id: number;
    name: string;
    npi: string;
    federalTaxID: string;
    prefix: string;
    providerMedicalFacilities: string;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}