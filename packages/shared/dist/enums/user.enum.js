"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnectionStatus = exports.UserAction = void 0;
var UserAction;
(function (UserAction) {
    UserAction[UserAction["leaved"] = 0] = "leaved";
    UserAction[UserAction["joined"] = 1] = "joined";
})(UserAction = exports.UserAction || (exports.UserAction = {}));
var UserConnectionStatus;
(function (UserConnectionStatus) {
    UserConnectionStatus["initiating"] = "initiating";
    UserConnectionStatus["connecting"] = "connecting";
    UserConnectionStatus["reconnecting"] = "reconnecting";
    UserConnectionStatus["connected"] = "connected";
})(UserConnectionStatus = exports.UserConnectionStatus || (exports.UserConnectionStatus = {}));
