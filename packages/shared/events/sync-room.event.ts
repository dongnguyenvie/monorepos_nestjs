// import { RoomEntity } from '@shared/entities';
import { RoomAction } from '../enums';

export class SyncRoomEvent {
  static NAME = 'SyncRoomEvent';
  static EVENT_NAME = 'sync-rooms';
  public room: Partial<any>;
  public action: RoomAction;

  constructor(partial: Partial<SyncRoomEvent>) {
    Object.assign(this, partial);
  }

  get expose() {
    return {
      action: this.action,
      room: this.room,
    };
  }
}
