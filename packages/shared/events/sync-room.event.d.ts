import { RoomEntity } from '@shared/entities';
import { RoomAction } from '../enums';
export declare class SyncRoomEvent {
    static NAME: string;
    static EVENT_NAME: string;
    room: Partial<RoomEntity>;
    action: RoomAction;
    constructor(partial: Partial<SyncRoomEvent>);
    get expose(): {
        action: RoomAction;
        room: RoomEntity;
    };
}
