import { Company } from '../../models/company';
import { Account } from '../../models/account';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';
import { CompanyAdapter } from './company-adapter';
import * as moment from 'moment';
import * as _ from 'underscore';


export class AccountAdapter {


    static parseResponse(accountData: any, accessToken: string, tokenExpiresAt: any, tokenResponse: any): Account {

        let account = null;
        let companies: Company[] = [];

        if (accountData) {
            if (accountData.usercompanies) {
                let allCompanies: Company[] = [];
                for (let company of accountData.usercompanies) {
                    allCompanies.push(CompanyAdapter.parseResponse(company.company));
                }
                companies = _.filter(allCompanies, (currCompany: Company) => {
                    return currCompany.companyType == 2;
                })
            }
            account = new Account({
                user: UserAdapter.parseUserResponse(accountData.user),
                companies: companies,
                accessToken: accessToken,
                tokenExpiresAt: tokenExpiresAt,
                tokenResponse: tokenResponse ? tokenResponse : null,
                originalResponse: accountData
            });
        }
        return account;
    }

    static parseStoredData(accountData: any): Account {
        let account = null;
        let companies: Company[] = [];
        if (accountData) {
            if (accountData.companies) {
                for (let company of accountData.companies) {
                    companies.push(CompanyAdapter.parseResponse(company));
                }
            }
            account = new Account({
                user: UserAdapter.parseUserResponse(accountData.user),
                companies: companies,
                accessToken: accountData.accessToken,
                tokenExpiresAt: moment(accountData.tokenExpiresAt),
                tokenResponse: accountData.tokenResponse ? accountData.tokenResponse : null,
                originalResponse: accountData.originalResponse
            });
        }
        return account;
    }

}