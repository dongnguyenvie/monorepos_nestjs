import { browser } from '$app/environment';
import {
	DEFAULT_MIC,
	DEFAULT_SPEAKER,
	DEFAULT_WEBCAM,
	DEFAULT_WEBCAM_RESOLUTION,
	WEBCAM_RESOLUTION_CONFIG
} from '@noinghe/shared/constants';
import { SideBarMode, type App, type MicConfig, type WebcamSetting } from '$lib/types';
import { derived, writable } from 'svelte/store';

const APP_SETTINGS = 'APP_SETTINGS';

const stored =
	browser && localStorage.getItem(APP_SETTINGS) && JSON.parse(localStorage.getItem(APP_SETTINGS)!);

const initApp = {
	isCollapse: false,
	isXs: false,
	speaker: {
		deviceId: DEFAULT_SPEAKER
	},
	mic: {
		deviceId: DEFAULT_MIC,
		echoCancellation: false,
		noiseSuppression: false,
		autoGainControl: false
	},
	webcam: {
		deviceId: DEFAULT_WEBCAM,
		resoluation: DEFAULT_WEBCAM_RESOLUTION
	},
	sideBarMode: SideBarMode.SIDE
} as unknown as App;

const { subscribe, set, update } = writable<App>(stored || initApp);

const isCollapse = derived({ subscribe }, ($app) => $app.isCollapse);
const isXsScreen = derived({ subscribe }, ($app) => $app.isXs);
const sideBarMode = derived({ subscribe }, ($app) => $app.sideBarMode);
const micConfig = derived({ subscribe }, ($app) => $app.mic || initApp.mic);
const speakerConfig = derived({ subscribe }, ($app) => $app.speaker || initApp.speaker);
const webcamConfig = derived({ subscribe }, ($app) => {
	const s = $app.webcam || initApp.webcam;
	const resoluation =
		WEBCAM_RESOLUTION_CONFIG[
			(s.resoluation ||
				DEFAULT_WEBCAM_RESOLUTION) as unknown as keyof typeof WEBCAM_RESOLUTION_CONFIG
		];
	return {
		...s,
		deviceId: s.deviceId || '',
		width: resoluation.width,
		height: resoluation.height
	};
});

export const appSettings = {
	subscribe,
	set,
	update,
	isCollapse,
	sideBarMode,
	micConfig,
	isXsScreen,
	webcamConfig,
	speakerConfig,
	onToggleCollapse: () => {
		update((data) => {
			data.isCollapse = !data.isCollapse;
			return data;
		});
	},
	onChangeSideBarMode: (mode: SideBarMode) => {
		update((data) => {
			data.sideBarMode = mode;
			return data;
		});
	},
	onSetXsFlag: (isXs: boolean) => {
		update((data) => {
			data.isXs = isXs;
			return data;
		});
	},
	onUpdateWebcamSetting: (webcamConfig: Partial<WebcamSetting>) => {
		update((data) => {
			data.webcam = {
				...data.webcam,
				...webcamConfig
			};
			return data;
		});
	},
	onUpdateMicSetting: (micConfig: Partial<MicConfig>) => {
		update((data) => {
			data.mic = {
				...data.mic,
				...micConfig
			};
			return data;
		});
	}
};

if (browser) {
	subscribe((value) => {
		localStorage.setItem(APP_SETTINGS, JSON.stringify(value));
	});
}
