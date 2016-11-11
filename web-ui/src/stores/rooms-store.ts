import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Room } from '../models/room';
import { RoomsService } from '../services/rooms-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from './session-store';

@Injectable()
export class RoomsStore {

    private _rooms: BehaviorSubject<List<Room>> = new BehaviorSubject(List([]));
    private _selectedRoom: BehaviorSubject<Room> = new BehaviorSubject(null);

    constructor(
        private _roomsService: RoomsService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get rooms() {
        return this._rooms.asObservable();
    }

    get selectedRoom() {
        return this._selectedRoom.asObservable();
    }

    getRooms(): Observable<Room[]> {
        let promise = new Promise((resolve, reject) => {
            this._roomsService.getRooms().subscribe((rooms: Room[]) => {
                this._rooms.next(List(rooms));
                resolve(rooms);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room[]>>Observable.fromPromise(promise);
    }
      findRoomById(id: number) {
        let rooms = this._rooms.getValue();
        let index = rooms.findIndex((currentRoom: Room) => currentRoom.id === id);
        return rooms.get(index);
    }

    fetchRoomById(id: number): Observable<Room> {
        let promise = new Promise((resolve, reject) => {
            let matchedRoom: Room = this.findRoomById(id);
            if (matchedRoom) {
                resolve(matchedRoom);
            } else {
                this._roomsService.getRoom(id)
                .subscribe((room: Room) => {
                    resolve(room);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Room>>Observable.fromPromise(promise);
    }
    addRoom(roomDetail: Room): Observable<Room> {
        let promise = new Promise((resolve, reject) => {
            this._roomsService.addRoom(roomDetail).subscribe((room: Room) => {
                this._rooms.next(this._rooms.getValue().push(room));
                resolve(room);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room>>Observable.from(promise);
    }
    updateRoom(roomDetail: Room): Observable<Room> {
        let promise = new Promise((resolve, reject) => {
            this._roomsService.updateRoom(roomDetail).subscribe((roomDetail: Room) => {
                this._rooms.next(this._rooms.getValue().push(roomDetail));
                resolve(roomDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room>>Observable.from(promise);
    }
    deleteRoom(room: Room) {
        let rooms = this._rooms.getValue();
        let index = rooms.findIndex((currentRoom: Room) => currentRoom.id === room.id);
        let promise = new Promise((resolve, reject) => {
            this._roomsService.deleteRoom(room)
            .subscribe((room: Room) => {
                this._rooms.next(rooms.delete(index));
                resolve(room);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Room>>Observable.from(promise);
    }

    resetStore() {
        this._rooms.next(this._rooms.getValue().clear());
        this._selectedRoom.next(null);
    }

    selectRoom(room: Room) {
        this._selectedRoom.next(room);
    }
}