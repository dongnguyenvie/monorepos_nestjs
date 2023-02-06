"use strict";
exports.__esModule = true;
exports.redisHelper = void 0;
var R = require("ramda");
var RedisHelper = /** @class */ (function () {
    function RedisHelper() {
    }
    RedisHelper.prototype.jsonEncode = function (data) {
        return JSON.stringify(data);
    };
    RedisHelper.prototype.jsonDecode = function (data) {
        try {
            return JSON.parse(data);
        }
        catch (error) {
            return data;
        }
    };
    RedisHelper.prototype.jsonDecodeObject = function (data, toArray) {
        var _this = this;
        if (toArray === void 0) { toArray = false; }
        if (R.is(Array, data)) {
            return data.map(function (d) { return _this.jsonDecode(d); });
        }
        if (R.is(Object, data)) {
            if (toArray) {
                return Object.keys(data).map(function (key) { return _this.jsonDecode(data[key]); });
            }
            var _newData = {};
            for (var key in data) {
                _newData[key] = this.jsonDecode(data[key]);
            }
            return _newData;
        }
    };
    return RedisHelper;
}());
exports.redisHelper = new RedisHelper();
