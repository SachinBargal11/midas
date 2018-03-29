import { Location } from '../../models/location';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';


export class LocationAdapter {
    static parseResponse(locationData: any): Location {
        let location: Location = new Location({
            id: locationData.id,
            name: locationData.name,
            locationType: locationData.locationType,
            isDeleted: locationData.isDeleted ? true : false,
            companyId: locationData.companyId
        });
        return location;
    }

}