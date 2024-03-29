<script lang="ts">
	import logo from '$lib/icons/logo.svg';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { appSettings, auth } from '$lib/state';
	import { sidebarConfig } from './sidebar.config';
	import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
	import Icon from 'svelte-awesome';

	const { onToggleCollapse, isCollapse, isXsScreen } = appSettings;
	export let className: string = '';
</script>

<aside
	class={`bg-white ${className} transition-[width] ${
		$isCollapse ? 'w-[45px]' : `w-[280px] ${$isXsScreen ? 'z-30 fixed' : ''}`
	} z-10 min-h-[100vh] top-0`}
>
	<div class="sticky p-0 m-0 top-0">
		<div class="corner md:pt-2 md:px-[20px] min-h-[90px]">
			{#if !$isCollapse}
				<a href="/">
					<img src={logo} class="w-full max-w-[150px]" alt="SvelteKit" />
				</a>
			{/if}
		</div>

		<div class={`flex ${$isCollapse ? '' : 'justify-end'} px-3 py-2`}>
			{#if $isCollapse}
				<button class="opacity-50 hover:opacity-90" on:click={onToggleCollapse}>
					<Icon data={faAnglesRight} /></button
				>
			{:else}
				<button class="opacity-50 hover:opacity-90" on:click={onToggleCollapse}>
					<Icon data={faAnglesLeft} /></button
				>
			{/if}
		</div>

		<div class=" p-0 m-0 top-[90px] mt-4">
			<div class="rounded overflow-hidden">
				<ul class="space-y-2">
					{#each sidebarConfig as item}
						{#if (!!item.auth && !!$auth.id) || !item.auth}
							<li
								class="active py-[14px] rounded-lg hover:bg-primary-80 "
								class:active={$page.url.pathname === item.path}
							>
								<a
									href="#"
									class="flex items-center text-base font-normal"
									on:click={() => {
										goto(item.path);
									}}
								>
									<span class="px-2">
										{@html item.icon($page.url.pathname === item.path ? '#4DB6AC' : '#637381')}
									</span>
									<span class="ml-2 flex-shrink">{item.name}</span>
								</a>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>
	</div>
</aside>

<style>
	.user-info {
		background-color: var(--bg-gray-80);
	}
	.role {
		color: var(--text-secondary);
	}
	li.active {
		@apply bg-primary-80;
	}
	li.active span {
		@apply text-main-300 font-bold;
	}
	li span {
		color: var(--text-secondary);
	}
	aside {
		border-right: 1px dashed rgba(145, 158, 171, 0.24);
	}
</style>
