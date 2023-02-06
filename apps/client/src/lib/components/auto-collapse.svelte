<script context="module" lang="ts">
	export const csr = true;
	export const ssr = false;
</script>

<script lang="ts">
	import { appSettings } from '$lib/state';
	import { onMount } from 'svelte';
	const { isCollapse, onToggleCollapse, onSetXsFlag } = appSettings;
	import { get } from 'svelte/store';
	import _ from 'underscore';

	const setWindowWidth = () => {
		const _isCollapse = get(isCollapse);
		if (window.innerWidth < 768) {
			if (!_isCollapse) {
				onToggleCollapse();
			}
		} else {
			if (_isCollapse) {
				onToggleCollapse();
			}
		}

		if (window.innerWidth < 640) {
			onSetXsFlag(true);
		} else {
			onSetXsFlag(false);
		}
	};

	const debouncedSetWindowWidth = _.debounce(setWindowWidth, 300);

	onMount(() => {
		window.addEventListener('resize', debouncedSetWindowWidth);

		return () => {
			window.removeEventListener('resize', debouncedSetWindowWidth);
		};
	});
</script>
