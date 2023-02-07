export interface ICoreService<T = any> {
    update: (payload: T, ...Others: any[]) => void;
    create: (payload: T, ...Others: any[]) => void;
    recoverById: (id: string, ...Others: any[]) => void;
    findById: (id: string, ...Others: any[]) => void;
    softDeleteById: (id: string, ...Others: any[]) => void;
    list: (...Others: any[]) => void;
    listDeleted: (...Others: any[]) => void;
}
//# sourceMappingURL=core-service.interface.d.ts.map