import { RoomAction } from '../enums';
export declare class SyncRoomEvent {
    static NAME: string;
    static EVENT_NAME: string;
    room: Partial<any>;
    action: RoomAction;
    constructor(partial: Partial<SyncRoomEvent>);
    get expose(): {
        action: RoomAction;
        room: Partial<any>;
    };
}
//# sourceMappingURL=sync-room.event.d.ts.map