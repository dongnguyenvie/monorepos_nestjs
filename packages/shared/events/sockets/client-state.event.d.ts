export declare class ClientStateEvent {
    isVideo: boolean;
    isAudio: boolean;
    from: string;
    roomId: string;
    watchingId: string | null;
    share: string;
    constructor(partial: Partial<ClientStateEvent>);
}
