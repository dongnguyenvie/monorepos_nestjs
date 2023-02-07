declare class RedisHelper {
    jsonEncode(data: Record<string, any>): string;
    jsonDecode<T = unknown>(data: string): T;
    jsonDecodeObject<T extends Record<string, any> | Array<string>>(data: T, toArray?: boolean): unknown[] | T;
}
export declare const redisHelper: RedisHelper;
export {};
//# sourceMappingURL=redis.helper.d.ts.map