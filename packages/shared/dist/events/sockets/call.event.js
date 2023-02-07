"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallEvent = void 0;
class CallEvent {
    constructor(partial) {
        Object.assign(this, partial);
    }
    get expose() {
        return {
            roomId: this.roomId,
            initiator: this.initiator,
            callerId: this.callerId,
            signal: this.signal,
            socketId: this.socketId,
            reconnect: this.reconnect,
        };
    }
}
exports.CallEvent = CallEvent;
