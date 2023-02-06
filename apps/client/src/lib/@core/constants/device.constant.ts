export const DEFAULT_WEBCAM_RESOLUTION = '480p4_3';
export const DEFAULT_MIC = 'default';
export const DEFAULT_SPEAKER = 'default';
export const DEFAULT_WEBCAM = '';
export const WEBCAM_RESOLUTION_CONFIG = {
	'240p': {
		width: 320,
		height: 240,
		label: '240p',
		value: '240p'
	},
	'360p': {
		width: 640,
		height: 360,
		label: '360p',
		value: '360p'
	},
	'480p4_3': {
		width: 640,
		height: 480,
		label: '480p (SD) 4:3',
		value: '480p4_3'
	},
	'480p': {
		width: 853,
		height: 480,
		label: '480p (SD) 4:3',
		value: '480p'
	},
	'720p': {
		width: 1280,
		height: 720,
		label: '720p (HD) 16:9',
		value: '720p'
	},
	'1080p': {
		width: 1920,
		height: 1080,
		label: '1080p (FHD) 16:9',
		value: '1080p'
	},
	'1440p': {
		width: 2560,
		height: 1440,
		label: '1440p (QHD) 16:9',
		value: '1440p'
	},
	'2160p': {
		width: 3840,
		height: 2160,
		label: '2160p (UHD) 16:9',
		value: '2160p'
	}
};
export const WEBCAM_RESOLUTIONS = Object.values(WEBCAM_RESOLUTION_CONFIG);
