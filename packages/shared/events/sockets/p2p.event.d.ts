import { MediaRequest } from "../../enums/media-request.enum";
export declare class P2PEvent {
    from: string;
    to: string;
    message: string;
    action: MediaRequest;
    constructor(partial: Partial<P2PEvent>);
}
