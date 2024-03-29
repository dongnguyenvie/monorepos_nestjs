<script lang="ts">
	import type { Client } from '$lib/types';
	import type { SocketID } from '$lib/types/socket';
	import Icon from 'svelte-awesome';
	import { faMicrophoneSlash, faVideoCamera, faGear } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';
	import type { UserInfo } from '$lib/types/user.type';
	import { PLAYHOLDER_AVATAR } from '@noinghe/shared/src/constants';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';

	export let watchersMap = {} as Record<string, any>;
	export let client: Client & { info: UserInfo };
	export let idSelected: SocketID;
	export let myId: SocketID;

	export let onFocusOn: (sid: SocketID) => void;

	export let onReconnect: (sid: SocketID) => void;

	let volumeLevel = '20%';

	$: isGuest = client.sid !== myId;

	const handleFocusOn = (sid: SocketID) => () => {
		onFocusOn(sid);
	};

	const handleReconnect = (sid: SocketID) => () => {
		onReconnect(sid);
	};

	let volumeInterval: any;

	const handleCheckVolumeLevel = () => {
		if (client.audioStream && client.isAudio) {
			const audioContext = new window.AudioContext();
			const audioSource = audioContext.createMediaStreamSource(client.audioStream);
			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 512;
			analyser.minDecibels = -127;
			analyser.maxDecibels = 0;
			analyser.smoothingTimeConstant = 0.4;
			audioSource.connect(analyser);
			const volumes = new Uint8Array(analyser.frequencyBinCount);

			const volumeCallback = () => {
				analyser.getByteFrequencyData(volumes);
				let volumeSum = 0;
				for (const volume of volumes) volumeSum += volume;
				const averageVolume = volumeSum / volumes.length;
				// Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
				volumeLevel = (averageVolume * 100) / 127 + '%';
				// volumeVisualizer.style.setProperty('--volume', (averageVolume * 100) / 127 + '%');
			};

			if (!volumeInterval) {
				volumeInterval = setInterval(volumeCallback, 100);
			}
		} else {
			if (!client.audioStream) {
				!!volumeInterval && clearInterval(volumeInterval);
				volumeLevel = '0%';
				volumeInterval = null;
			}
		}
	};

	// $: client.isAudio && handleCheckVolumeLevel();

	onDestroy(() => {
		!!volumeInterval && clearInterval(volumeInterval);
		volumeLevel = '0%';
		volumeInterval = null;
	});
</script>

<div class={`relative max-w-[96px] min-w-[60px] ml-1`} title={client.sid}>
	<div class="flex h-[33px] gap-1 items-end pb-1">
		{#each watchersMap[client.sid] || [] as watcher}
			<span
				class={`w-[16px] h-[16px] overflow-hidden rounded-full inline-flex ${
					client.sid == watcher.sid ? 'border-2 w-[20px] h-[20px] rounded-sm border-red-600' : ''
				}`}
			>
				<img
					class="block object-cover w-full h-full"
					src={watcher.info?.avatar || PLAYHOLDER_AVATAR}
					alt={watcher.sid}
				/>
			</span>
		{/each}
	</div>

	<div
		class={`relative cursor-pointer w-[96px] h-[96px] rounded-sm card-hover ${
			client.sid === idSelected ? 'avatar-active' : ''
		}`}
		aria-hidden="true"
		on:click={handleFocusOn(client.sid)}
	>
		<img
			class="block object-cover w-full h-full rounded-sm"
			src={client.info?.avatar || PLAYHOLDER_AVATAR}
			alt={client.sid}
		/>
		<div
			class="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full items-center justify-center z-10 hidden card-name"
		>
			<span class="text-white card-name text-center text-sm">{client.info?.name || ''} </span>
		</div>

		<div>
			{#if client.isVideo}
				<span
					class="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-60"
				>
					<Icon data={faVideoCamera} scale={2.5} />
				</span>
			{/if}
			{#if isGuest}
				<span
					class="absolute top-0 right-0 border border-zinc-500 rounded-lg inline-flex justify-center items-center w-[25px] h-[25px] z-[11]"
				>
					<Icon data={faGear} />
					<Dropdown placement="top">
						<DropdownItem on:click={handleReconnect(client.sid)}>Reconnect</DropdownItem>
					</Dropdown>
				</span>
			{/if}

			{#if !client.isAudio}
				<span
					class="absolute bottom-1 right-1 border-1 bg-slate-400 p-1 rounded-md cursor-pointer text-main-a400"
				>
					<Icon data={faMicrophoneSlash} label="open camera" flip="horizontal" scale={1.2} />
				</span>
			{/if}
			{#if isGuest}
				<span class="absolute bottom-1 left-1 z-10">
					<span>{client.status}</span>
				</span>
			{/if}

			<!-- {#if client.isAudio}
				<span class="absolute bottom-1 right-1 z-10">
					<div
						style="--volume: {volumeLevel}"
						class="text-blue-800 volume-visualizer rounded-sm opacity-75"
					/>
				</span>
			{/if} -->
		</div>
	</div>
</div>

<style>
	.volume-visualizer {
		--volume: 0%;
		position: relative;
		width: 10px;
		height: 50px;
		background-color: #ddd;
	}

	.volume-visualizer::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		height: var(--volume);
		width: 100%;
		background-color: green;
		transition: width 100ms linear;
	}
</style>
