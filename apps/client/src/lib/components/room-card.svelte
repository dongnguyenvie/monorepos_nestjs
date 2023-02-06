<script lang="ts">
	import dayjs from '@noinghe/shared/libs/dayjs';
	import ic_shape from '$lib/icons/ic_shape.svg';
	import { auth } from '$lib/state';
	import type { IRoomUser } from '$lib/types';
	import { Avatar } from 'flowbite-svelte';
	import { loop } from 'svelte/internal';
	import ClientAvatar from './avatars/client-avatar.svelte';
	import Button from './button.svelte';
	import Tag from './tag.svelte';

	export let id: string;
	export let clients: Omit<IRoomUser, 'sid'>[];
	export let capacity: number;
	export let title: string;
	export let avatar: string;
	export let name: string;
	export let tags: string[];
	export let emotions: string[];
	export let buttonLabel: string = 'Trò truyện';
	export let disabledButton = false;
	export let onClick: () => void;
	export let onDelete: () => void;
	export let isFull: boolean = false;
	export let lastUpdatedAt: number;

	const roomExpired = parseInt(import.meta.env.VITE_ROOM_EXPIRED || 300);

	$: canClear = !clients.length && dayjs().unix() - lastUpdatedAt > roomExpired;

	$: clientSlots = Array.from(Array(capacity || 0)).map((_, index) => clients[index] || null);
</script>

<div class="room w-full bg-white rounded-2xl relative">
	<div class={`flex flex-col h-full relative ${canClear ? 'opacity-10' : ''}`}>
		<div class="p-6 h-full flex flex-col justify-between">
			<div>
				<div class="flex justify-between">
					<h5 class="text-sm leading-[22px] font-bold mb-4 text-primary capitalize truncate">
						{name}
					</h5>
					<div class="cursor-pointer">
						<img src={ic_shape} alt="" />
					</div>
				</div>
				<span class="text-body2 text-primary mb-4">{title}</span>
				<div class="mt-4 mb-4">
					{#each tags as tag, i}
						<Tag className="mb-2">{tag}</Tag>
					{/each}
				</div>

				{#if !canClear}
					<div class="flex flex-wrap justify-between">
						{#each clientSlots as clientSlot}
							<div class="mx-[1px] mb-[2px]">
								<ClientAvatar client={clientSlot} />
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="flex justify-center items-stretch pt-2">
				{#if isFull}
					<Button className="bg-main-c5B5B5B rounded-lg cursor-not-allowed">Phòng Đầy</Button>
				{/if}

				{#if !canClear && !isFull}
					<Button
						className={`w-[108px] px-[16px] py-[6px] text-center btn-talk bg-main-300 rounded-lg ${
							disabledButton ? 'hover:bg-main-300 cursor-not-allowed' : 'hover:bg-main-500'
						}`}
						{onClick}
						disabled={disabledButton}
					>
						{buttonLabel}
					</Button>
				{/if}
			</div>
		</div>
	</div>
	{#if canClear}
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<Button
				className={`w-[108px] px-[16px] py-[6px] text-center btn-talk bg-main-300 rounded-lg opacity-100 
		${!$auth.id ? 'cursor-not-allowed' : ''}`}
				onClick={onDelete}
				disabled={!$auth.id}
			>
				Xóa phòng
			</Button>
		</div>
	{/if}
</div>

<style>
	.room {
		box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12);
	}
</style>
