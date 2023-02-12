<script lang="ts">
	import { ROUTES } from '@noinghe/shared/src/constants';

	import Redirect from '$lib/components/redirect.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="homepage" />
</svelte:head>
<Redirect to={ROUTES.rooms} />

<style>
</style>
