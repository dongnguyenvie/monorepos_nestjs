"use strict";
exports.__esModule = true;
exports.ClientStateEvent = void 0;
var ClientStateEvent = /** @class */ (function () {
    function ClientStateEvent(partial) {
        this.watchingId = null;
        Object.assign(this, partial);
    }
    return ClientStateEvent;
}());
exports.ClientStateEvent = ClientStateEvent;
