export interface IPagination {
    limit: number;
    page: number;
    totalCount: number;
}
export interface IListPayload {
    pagination: IPagination;
    relations?: string[];
}
//# sourceMappingURL=pagination.interface.d.ts.map