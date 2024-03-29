import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
// import vercel from '@sveltejs/adapter-vercel';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				plugins: [tailwindcss(), autoprefixer()]
			}
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$houdini: './$houdini'
		}
	}
};

export default config;
