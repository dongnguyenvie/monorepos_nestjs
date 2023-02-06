import type { MediaRequest } from '@noinghe/shared/enums';
import type { SocketID } from '$lib/types/socket';

export class P2PEvent {
	from!: SocketID;
	to!: string;
	message!: string;
	action!: MediaRequest;

	constructor(partial: Partial<P2PEvent>) {
		Object.assign(this, partial);
	}
}
