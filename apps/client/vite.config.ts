import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	define: {
		global: 'globalThis',
		'process.env': {}
	},
	plugins: [houdini(), sveltekit()]
};

// '@noinghe/shared
export default config;
