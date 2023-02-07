export declare class CallEvent {
    roomId: string;
    initiator: boolean;
    callerId: string;
    signal: any;
    socketId: string;
    reconnect: boolean;
    constructor(partial: Partial<CallEvent>);
    get expose(): {
        roomId: string;
        initiator: boolean;
        callerId: string;
        signal: any;
        socketId: string;
        reconnect: boolean;
    };
}
//# sourceMappingURL=call.event.d.ts.map