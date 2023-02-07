"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncRoomEvent = void 0;
class SyncRoomEvent {
    constructor(partial) {
        Object.assign(this, partial);
    }
    get expose() {
        return {
            action: this.action,
            room: this.room,
        };
    }
}
exports.SyncRoomEvent = SyncRoomEvent;
SyncRoomEvent.NAME = 'SyncRoomEvent';
SyncRoomEvent.EVENT_NAME = 'sync-rooms';
