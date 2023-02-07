"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisHelper = void 0;
const tslib_1 = require("tslib");
const R = tslib_1.__importStar(require("ramda"));
class RedisHelper {
    jsonEncode(data) {
        return JSON.stringify(data);
    }
    jsonDecode(data) {
        try {
            return JSON.parse(data);
        }
        catch (error) {
            return data;
        }
    }
    jsonDecodeObject(data, toArray = false) {
        if (R.is(Array, data)) {
            return data.map((d) => this.jsonDecode(d));
        }
        if (R.is(Object, data)) {
            if (toArray) {
                return Object.keys(data).map((key) => this.jsonDecode(data[key]));
            }
            const _newData = {};
            for (const key in data) {
                _newData[key] = this.jsonDecode(data[key]);
            }
            return _newData;
        }
    }
}
exports.redisHelper = new RedisHelper();
