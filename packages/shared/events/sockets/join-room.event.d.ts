export declare class JoinRoomEvent {
    roomId: string;
    sid: string;
    isAudio: boolean;
    isVideo: boolean;
    constructor(partial: Partial<JoinRoomEvent>);
}
