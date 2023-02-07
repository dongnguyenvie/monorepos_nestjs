export declare class GraphqlDescription {
    private isPublic;
    private isSystem;
    private group;
    private isSub;
    private title;
    private description;
    private isDeleted;
    private isDefault;
    constructor(partial?: Partial<GraphqlDescription>);
    get toJson(): string;
    static Builder: {
        new (): {
            isPublic: boolean;
            isSystem: boolean;
            isSub: boolean;
            title: string;
            description: string;
            group: string;
            isDelete: boolean;
            isDefault: boolean;
            withPublic(): any;
            withSystem(): any;
            withSub(): any;
            withGroup(group: string): any;
            withTitle(title: string): any;
            withDesc(description: string): any;
            withDelete(): any;
            withDefault(): any;
            build(): string;
        };
    };
    static API(): {
        isPublic: boolean;
        isSystem: boolean;
        isSub: boolean;
        title: string;
        description: string;
        group: string;
        isDelete: boolean;
        isDefault: boolean;
        withPublic(): any;
        withSystem(): any;
        withSub(): any;
        withGroup(group: string): any;
        withTitle(title: string): any;
        withDesc(description: string): any;
        withDelete(): any;
        withDefault(): any;
        build(): string;
    };
    static fromString(str: string): {};
}
//# sourceMappingURL=description.helper.d.ts.map