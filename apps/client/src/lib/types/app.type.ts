export enum SideBarMode {
	OVER = 'OVER',
	SIDE = 'SIDE',
	PUSH = 'PUSH'
}
export interface MicConfig {
	echoCancellation: boolean;
	noiseSuppression: boolean;
	autoGainControl: boolean;
	deviceId: string;
}

export interface WebcamSetting {
	resoluation: string;
	deviceId: string;
}

export interface SpeakerSetting {
	deviceId: string;
}

export interface App {
	isCollapse: boolean;
	isXs: boolean;
	mic: MicConfig;
	speaker: SpeakerSetting;
	webcam: WebcamSetting;
	sideBarMode: SideBarMode;
}
