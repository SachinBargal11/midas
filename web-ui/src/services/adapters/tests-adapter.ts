import {Tests} from '../../models/tests';


export class TestsAdapter {
    static parseResponse(testsData: any): Tests {

        let tests = null;
        if (testsData) {
            tests = new Tests({
                    id: testsData.id,
                    name: testsData.name
            });
        }
        return tests;
    }
}