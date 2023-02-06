<script context="module" lang="ts">
</script>

<script lang="ts">
	import MainHeader from '$lib/components/headers/main-header.svelte';
	import MainSidebar from '$lib/components/sidebars/main-sidebar.svelte';
	import AutoCollapse from '$lib/components/auto-collapse.svelte';
</script>

<AutoCollapse />
<div class="min-h-screen min-w-full flex flex-col">
	<MainHeader className="min-h-[92px] flex items-center" />
	<div class="bg-white w-full flex min-h-full m-0 p-0 flex-grow">
		<MainSidebar className={`flex-shrink-0`} />
		<main class="w-[calc(100%_-_280px)] flex-grow px-5 py-4 bg-main-100">
			<slot />
		</main>
	</div>
	<footer />
</div>

<style>
</style>
