"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlDescription = void 0;
class GraphqlDescription {
    constructor(partial = {}) {
        Object.assign(this, partial);
    }
    get toJson() {
        return JSON.stringify({
            publ: this.isPublic,
            t: this.title,
            desc: this.description,
            sys: this.isSystem,
            sub: this.isSub,
            gr: this.group,
            d: this.isDefault,
        });
    }
    static API() {
        return new this.Builder();
    }
    static fromString(str) {
        try {
            const desc = JSON.parse(str);
            return new GraphqlDescription(desc);
        }
        catch (error) {
            return {};
        }
    }
}
exports.GraphqlDescription = GraphqlDescription;
GraphqlDescription.Builder = class {
    constructor() {
        this.isPublic = false;
        this.isSystem = false;
        this.isSub = false;
        this.title = '';
        this.description = '';
        this.group = '';
        this.isDelete = false;
        this.isDefault = false;
    }
    withPublic() {
        this.isPublic = true;
        return this;
    }
    withSystem() {
        this.isSystem = true;
        return this;
    }
    withSub() {
        this.isSub = true;
        return this;
    }
    withGroup(group) {
        this.group = group;
        return this;
    }
    withTitle(title) {
        this.title = title;
        return this;
    }
    withDesc(description) {
        this.description = description;
        return this;
    }
    withDelete() {
        this.isDelete = false;
        return this;
    }
    withDefault() {
        this.isDefault = true;
        return this;
    }
    build() {
        const desc = new GraphqlDescription();
        desc.isPublic = this.isPublic;
        desc.description = this.description;
        desc.title = this.title;
        desc.isSystem = this.isSystem;
        desc.isSub = this.isSub;
        desc.group = this.group;
        desc.isDeleted = this.isDelete;
        desc.isDefault = this.isDefault;
        return desc.toJson;
    }
};
