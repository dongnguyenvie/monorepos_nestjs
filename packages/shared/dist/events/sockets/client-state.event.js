"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientStateEvent = void 0;
class ClientStateEvent {
    constructor(partial) {
        this.watchingId = null;
        Object.assign(this, partial);
    }
}
exports.ClientStateEvent = ClientStateEvent;
