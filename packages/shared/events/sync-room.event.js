"use strict";
exports.__esModule = true;
exports.SyncRoomEvent = void 0;
var SyncRoomEvent = /** @class */ (function () {
    function SyncRoomEvent(partial) {
        Object.assign(this, partial);
    }
    Object.defineProperty(SyncRoomEvent.prototype, "expose", {
        get: function () {
            return {
                action: this.action,
                room: this.room
            };
        },
        enumerable: false,
        configurable: true
    });
    SyncRoomEvent.NAME = 'SyncRoomEvent';
    SyncRoomEvent.EVENT_NAME = 'sync-rooms';
    return SyncRoomEvent;
}());
exports.SyncRoomEvent = SyncRoomEvent;
