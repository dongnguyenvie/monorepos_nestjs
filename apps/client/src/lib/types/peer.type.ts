import type { UserConfig } from '@noinghe/shared/src/interfaces';
import type SimplePeer from 'simple-peer';
import type { SocketID } from './socket';

export type PeerEvents = {
	/**
	 * Emitted when a connection to the PeerServer is established.
	 */
	open: (id: string) => void;
	/**
	 * Emitted when a new data connection is established from a remote peer.
	 */
	connection: (dataConnection: any) => void;
	/**
	 * Emitted when a remote peer attempts to call you.
	 */
	call: (mediaConnection: any) => void;
	/**
	 * Emitted when the peer is destroyed and can no longer accept or create any new connections.
	 */
	close: () => void;
	/**
	 * Emitted when the peer is disconnected from the signalling server
	 */
	disconnected: (currentId: string) => void;
	/**
	 * Errors on the peer are almost always fatal and will destroy the peer.
	 */
	error: (error: Error) => void;
};

export enum ClientShareable {
	video = 'mediaStream',
	audio = 'audioStream'
}
export interface Client extends UserConfig {
	id: string;
	sid: SocketID;
	mediaStream?: MediaStream;
	audioStream?: MediaStream;
	isAudio: boolean;
	isVideo: boolean;
	initiator: boolean;
	peer: SimplePeer.Instance;
	wid: string | null;
	share: ClientShareable | null;
	avatar: string; // nullable
	status: string;
}
