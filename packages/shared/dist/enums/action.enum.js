"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordAction = void 0;
var RecordAction;
(function (RecordAction) {
    RecordAction[RecordAction["delete"] = 0] = "delete";
    RecordAction[RecordAction["insert"] = 1] = "insert";
    RecordAction[RecordAction["update"] = 2] = "update";
})(RecordAction = exports.RecordAction || (exports.RecordAction = {}));
