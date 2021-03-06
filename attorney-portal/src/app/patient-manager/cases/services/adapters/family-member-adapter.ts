import * as moment from 'moment';
import { FamilyMember } from '../../models/family-member';
// import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
// import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';

export class FamilyMemberAdapter {
    static parseResponse(data: any): FamilyMember {

        let familyMember = null;
        if (data) {
            familyMember = new FamilyMember({
                id: data.id,
                caseId: data.caseId,
                relationId: data.relationId,
                isInActive: data.isInActive,
                // fullName: data.fullName,
                // familyName: data.familyName,
                // prefix: data.prefix,
                // sufix: data.sufix,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                age: data.age,
                genderId: data.genderId,
                raceId: data.raceId,
                ethnicitiesId: data.ethnicitesId,
                cellPhone: data.cellPhone,
                workPhone: data.workPhone,
                // primaryContact: data.primaryContact ? true : false
                primaryContact: data.primaryContact == true ? '1' : data.primaryContact == false ? '0' : null,
            });
        }
        return familyMember;
    }
}
