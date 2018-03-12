import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { Room } from '../models/room';
import { Schedule } from '../models/rooms-schedule';
import { Tests } from '../models/tests';
import { RoomsAdapter } from './adapters/rooms-adapter';
import { TestsAdapter } from './adapters/tests-adapter';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class RoomsService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    // private _url: string = 'http://localhost:3004/rooms';
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getRoom(roomId: Number): Observable<Room> {
        let promise: Promise<Room> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Room/Get/' + roomId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomData: any) => {
                    let parsedData: Room = null;
                    parsedData = RoomsAdapter.parseResponse(roomData);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<Room>>Observable.fromPromise(promise);
    }
    getRooms(locationId: number): Observable<Room[]> {
        let promise: Promise<Room[]> = new Promise((resolve, reject) => {
            return this._http.post(environment.SERVICE_BASE_URL + '/Room/GetAll', JSON.stringify({ location: { id: locationId } }), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let rooms: any[] = [];
                    if (_.isArray(roomsData)) {
                        rooms = (<Object[]>roomsData).map((roomsData: any) => {
                            return RoomsAdapter.parseResponse(roomsData);
                        });
                    }
                    resolve(rooms);

                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Room[]>>Observable.fromPromise(promise);
    }
    getRoomsByLocationDoctorId(locationId: number, DoctorId: number): Observable<Room[]> {
        let promise: Promise<Room[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/Room/getByLocationId/' + locationId +'/'+ DoctorId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let rooms: any[] = [];
                    if (_.isArray(roomsData)) {
                        rooms = (<Object[]>roomsData).map((roomsData: any) => {
                            return RoomsAdapter.parseResponse(roomsData);
                        });
                    }
                    resolve(rooms);

                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Room[]>>Observable.fromPromise(promise);
    }
    getRoomsByTestInAllApp(testId: number): Observable<Room[]> {
        let promise: Promise<Room[]> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/room/getByRoomInAllApp/' + testId, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let rooms: any[] = [];
                    if (_.isArray(roomsData)) {
                        rooms = (<Object[]>roomsData).map((roomsData: any) => {
                            return RoomsAdapter.parseResponse(roomsData);
                        });
                    }
                    resolve(rooms);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Room[]>>Observable.fromPromise(promise);
    }
    getTests(): Observable<Tests[]> {
        let promise: Promise<Tests[]> = new Promise((resolve, reject) => {
            return this._http.post(environment.SERVICE_BASE_URL + '/RoomTest/GetAll', JSON.stringify({}), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((testsData: Array<Object>) => {
                    let tests: any[] = (<Object[]>testsData).map((testsData: any) => {
                        return TestsAdapter.parseResponse(testsData);
                    });
                    resolve(tests);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Tests[]>>Observable.fromPromise(promise);
    }

    getTestsByID(roomTestID: Number): Observable<Tests> {
        let promise: Promise<Tests> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/RoomTest/get/' + roomTestID, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((testsData: any) => {
                    let parsedTestSpeciality: Tests = null;
                    parsedTestSpeciality = TestsAdapter.parseResponse(testsData);
                    resolve(parsedTestSpeciality);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Tests>>Observable.fromPromise(promise);
    }

    getTestsByLocationId(locationId: number): Observable<Tests[]> {
        let promise: Promise<Tests[]> = new Promise((resolve, reject) => {
            return this._http.get(`${environment.SERVICE_BASE_URL}/room/getByLocationId/${locationId}`, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((testsData: Array<Object>) => {
                    let tests: any[] = (<Object[]>testsData).map((testsData: any) => {
                        return TestsAdapter.parseResponse(testsData);
                    });
                    resolve(tests);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Tests[]>>Observable.fromPromise(promise);
    }

    getTestsByCompnayId(compnayId: number): Observable<Tests[]> {
        let promise: Promise<Tests[]> = new Promise((resolve, reject) => {
            return this._http.get(`${environment.SERVICE_BASE_URL}/Doctor/getAllDoctorTestSpecialityByCompany/${compnayId}`, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((testsData: Array<Object>) => {
                    let tests: any[] = (<Object[]>testsData).map((testsData: any) => {
                        return TestsAdapter.parseResponse(testsData);
                    });
                    resolve(tests);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Tests[]>>Observable.fromPromise(promise);
    }
    addRoom(roomDetail: Room): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = roomDetail.toJS();
            requestData.contactersonName = requestData.contactPersonName;
            requestData = _.omit(requestData, 'contactPersonName');
            return this._http.post(environment.SERVICE_BASE_URL + '/Room/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let parsedRoom: Room = null;
                    parsedRoom = RoomsAdapter.parseResponse(roomsData);
                    resolve(parsedRoom);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateRoom(roomDetail: Room): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = roomDetail.toJS();
            requestData.contactersonName = requestData.contactPersonName;
            requestData = _.omit(requestData, 'contactPersonName');
            return this._http.post(environment.SERVICE_BASE_URL + '/Room/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let parsedRoom: Room = null;
                    parsedRoom = RoomsAdapter.parseResponse(roomsData);
                    resolve(parsedRoom);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    updateScheduleForRoom(room: Room, schedule: Schedule): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = room.toJS();
            requestData.schedule = {
                id: schedule.id
            };
            return this._http.post(environment.SERVICE_BASE_URL + '/Room/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedRoom: Room = null;
                parsedRoom = RoomsAdapter.parseResponse(data);
                resolve(parsedRoom);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    deleteRoom(roomDetail: Room): Observable<Room> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            let requestData: any = roomDetail.toJS();
            requestData.isDeleted = 1,
                requestData.contactersonName = requestData.contactPersonName;
            requestData = _.omit(requestData, 'contactPersonName');
            return this._http.post(environment.SERVICE_BASE_URL + '/Room/Add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((roomsData: any) => {
                    let parsedRoom: Room = null;
                    parsedRoom = RoomsAdapter.parseResponse(roomsData);
                    resolve(parsedRoom);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    // deleteRoom(room: Room): Observable<Room> {
    //     let promise = new Promise((resolve, reject) => {
    //         return this._http.delete(`${environment.SERVICE_BASE_URL}/${room.id}`, {
            //     headers: this._headers
            // })
    //             .map(res => res.json())
    //             .subscribe((room) => {
    //                 resolve(room);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<Room>>Observable.from(promise);
    // }

}
