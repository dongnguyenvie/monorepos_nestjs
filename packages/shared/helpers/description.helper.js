"use strict";
exports.__esModule = true;
exports.GraphqlDescription = void 0;
var GraphqlDescription = /** @class */ (function () {
    function GraphqlDescription(partial) {
        if (partial === void 0) { partial = {}; }
        Object.assign(this, partial);
    }
    Object.defineProperty(GraphqlDescription.prototype, "toJson", {
        get: function () {
            return JSON.stringify({
                publ: this.isPublic,
                t: this.title,
                desc: this.description,
                sys: this.isSystem,
                sub: this.isSub,
                gr: this.group,
                d: this.isDefault
            });
        },
        enumerable: false,
        configurable: true
    });
    GraphqlDescription.API = function () {
        return new this.Builder();
    };
    GraphqlDescription.fromString = function (str) {
        try {
            var desc = JSON.parse(str);
            return new GraphqlDescription(desc);
        }
        catch (error) {
            return {};
        }
    };
    GraphqlDescription.Builder = /** @class */ (function () {
        function class_1() {
            this.isPublic = false;
            this.isSystem = false;
            this.isSub = false;
            this.title = '';
            this.description = '';
            this.group = '';
            this.isDelete = false;
            this.isDefault = false;
        }
        class_1.prototype.withPublic = function () {
            this.isPublic = true;
            return this;
        };
        class_1.prototype.withSystem = function () {
            this.isSystem = true;
            return this;
        };
        class_1.prototype.withSub = function () {
            this.isSub = true;
            return this;
        };
        class_1.prototype.withGroup = function (group) {
            this.group = group;
            return this;
        };
        class_1.prototype.withTitle = function (title) {
            this.title = title;
            return this;
        };
        class_1.prototype.withDesc = function (description) {
            this.description = description;
            return this;
        };
        class_1.prototype.withDelete = function () {
            this.isDelete = false;
            return this;
        };
        class_1.prototype.withDefault = function () {
            this.isDefault = true;
            return this;
        };
        class_1.prototype.build = function () {
            var desc = new GraphqlDescription();
            desc.isPublic = this.isPublic;
            desc.description = this.description;
            desc.title = this.title;
            desc.isSystem = this.isSystem;
            desc.isSub = this.isSub;
            desc.group = this.group;
            desc.isDeleted = this.isDelete;
            desc.isDefault = this.isDefault;
            return desc.toJson;
        };
        return class_1;
    }());
    return GraphqlDescription;
}());
exports.GraphqlDescription = GraphqlDescription;
