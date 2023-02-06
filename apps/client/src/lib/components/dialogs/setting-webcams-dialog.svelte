<script lang="ts">
	import { Modal, Label, Select, Button, Checkbox } from 'flowbite-svelte';
	import { appSettings } from '$lib/state';
	import micIcon from '$lib/icons/mic.svg';
	import micPhone from '$lib/icons/mic.svg';
	import threeDot from '$lib/icons/threedot.svg';
	import cameraIcon from '$lib/icons/camera.svg';
	import speakerIcon from '$lib/icons/speaker.svg';
	import { onMount } from 'svelte';
	import * as R from 'ramda';

	const { micConfig } = appSettings;
	export let isOpen = false;
	export let onClose = () => {};
	export let onChange = () => {};
	let tabIndex = 0;

	const tabDefination = {
		mic: 0,
		cam: 1,
		speaker: 2
	};

	const tabConfig = {
		[tabDefination.mic]: {
			value: tabDefination.mic,
			label: 'Mic',
			title: 'Microphone Settings'
		},
		[tabDefination.cam]: {
			value: tabDefination.cam,
			label: 'Cam',
			title: 'Camera Settings'
		},
		[tabDefination.speaker]: {
			value: tabDefination.speaker,
			label: 'Speaker',
			title: 'Speaker Settings'
		}
	};

	const handleSelectMenu = (index: number) => {
		return () => {
			tabIndex = index;
		};
	};

	const handleResetDefault = () => {
		console.log(tabIndex);
	};

	const supportedConstraints = [
		{ name: 'Auto Gain Control', value: 'autoGainControl' },
		{ name: 'Echo Cancellation', value: 'echoCancellation' },
		{ name: 'Noise Suppression', value: 'noiseSuppression' }
	];

	let mediaDevices: MediaDeviceInfo[] = [];

	$: inputMap = R.groupBy(R.prop('kind'), mediaDevices);
	$: audioInput = (inputMap.audioinput || []).map((device) => ({
		name: device.label,
		value: device.deviceId
	}));
	$: audiooutput = (inputMap.audiooutput || []).map((device) => ({
		name: device.label,
		value: device.deviceId
	}));
	$: videoinput = [...(inputMap.videoinput || [])].map((device) => ({
		name: device.label,
		value: device.deviceId
	}));

	const getDevices = () => {
		const gotDevices = (mediaDeviceInfo: MediaDeviceInfo[]) => {
			mediaDevices = mediaDeviceInfo;
		};
		navigator.mediaDevices.enumerateDevices().then(gotDevices);
	};

	onMount(() => {
		getDevices();
	});

	$: if (isOpen) {
		getDevices();
	}

	const isChecked = (key: string) => {
		return !!$micConfig[key as unknown as keyof typeof $micConfig];
	};

	const handleMarkAsChanged = () => {
		onChange();
	};
</script>

<Modal class="bg-white" cl bind:open={isOpen} on:hide={onClose} size="lg" autoclose={false}>
	<div class="flex w-full">
		<div class="w-full md:w-[35%] lg:w-[30%]">
			<div class="-my-6 border-r border-solid border-disabled">
				<div class="py-6 pr-10 pl-[26px]">
					<h3 class="text-2xl leading-9 text-secondary mb-6 font-bold">Settings</h3>

					<ul class="w-full flex flex-col gap-y-3">
						<li
							on:click={handleSelectMenu(tabDefination.mic)}
							class={`flex border-b-2 border-solid w-full pb-[18px] cursor-pointer ${
								tabIndex === 0 ? 'border-primary-500' : 'border-secondary-500'
							} mb-3`}
							aria-hidden="true"
						>
							<img class="pr-3" src={micIcon} alt="" />
							<span class="font-bold text-base text-primary-500">Mic</span>
						</li>
						<li
							on:click={handleSelectMenu(tabDefination.cam)}
							class={`flex border-b-2 border-solid w-full pb-[18px] cursor-pointer mb-3 ${
								tabIndex === 1 ? 'border-primary-500' : 'border-secondary-500'
							}`}
							aria-hidden="true"
						>
							<img class="pr-3" src={cameraIcon} alt="" />
							<span class="font-bold text-base text-secondary">Cam</span>
						</li>
						<li
							on:click={handleSelectMenu(tabDefination.speaker)}
							class={`flex border-b-2 border-solid w-full pb-[18px] cursor-pointer ${
								tabIndex === 2 ? 'border-primary-500' : 'border-secondary-500'
							}`}
							aria-hidden="true"
						>
							<img class="pr-3" src={speakerIcon} alt="" />
							<span class="font-bold text-base text-secondary">Speaker</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="flex-1 px-[36px] mt-[30px]">
			{#if tabIndex === tabDefination.mic}
				<div class="reset-setting flex justify-between items-center border-0 border-b pb-2 mb-4">
					<span>{tabConfig[tabIndex].title}</span>
					<Button size="xs" on:click={handleResetDefault}>Reset Default</Button>
				</div>
				<div>
					<span class=" mb-[10px] block font-semibold text-base text-primary-500">Source</span>
					<div class="mb-6 flex items-end w-full">
						<div class="w-full mr-[50px]">
							<Label>
								<Select
									class="outline-none mt-2 bg-transparent rounded-none border-t-0 border-l-0 border-r-0 border-b border-solid"
									items={audioInput}
									bind:value={$appSettings.mic.deviceId}
									on:change={handleMarkAsChanged}
								/>
							</Label>
						</div>
						<div class="settings flex items-center pb-2">
							<img class="mr-2 w-6" src={micPhone} alt="" />
							<img class="w-7" src={threeDot} alt="" />
						</div>
					</div>
				</div>
				<div>
					<div>
						<p>Advanced</p>
						<ul class="items-center w-full rounded-lg sm:flex">
							{#each supportedConstraints as item}
								<li class="w-full">
									<Checkbox checked={isChecked(item.value)}>{item.name}</Checkbox>
								</li>
							{/each}
						</ul>
					</div>
					<!-- <div class="opacity-30 cursor-not-allowed">
						<p>Voice Back To Headphone Volume</p>
						<div class="flex flex-row">
							<Range value={30} />
						</div>
					</div> -->
				</div>
			{/if}
			{#if tabIndex === tabDefination.cam}
				<div class="reset-setting flex justify-between items-center border-0 border-b pb-2 mb-4">
					<span>{tabConfig[tabIndex].title}</span>
					<Button size="xs" on:click={handleResetDefault}>Reset Default</Button>
				</div>
				<div>
					<span class=" mb-[10px] block font-semibold text-base text-primary-500">Source</span>
					<div class="mb-6 flex items-end w-full">
						<div class="w-full">
							<Label>
								<Select
									class="outline-none mt-2 bg-transparent rounded-none border-t-0 border-l-0 border-r-0 border-b border-solid"
									items={videoinput}
									bind:value={$appSettings.webcam.deviceId}
									on:change={handleMarkAsChanged}
									placeholder="Default"
								/>
							</Label>
						</div>
					</div>
					<div class="camera-preview">
						<div class="h-[200px] bg-black" />
					</div>
				</div>
			{/if}
			{#if tabIndex === tabDefination.speaker}
				<div class="reset-setting flex justify-between items-center border-0 border-b pb-2 mb-4">
					<span>{tabConfig[tabIndex].title}</span>
					<Button size="xs" on:click={handleResetDefault}>Reset Default</Button>
				</div>
				<div>
					<span class=" mb-[10px] block font-semibold text-base text-primary-500">Source</span>
					<div class="mb-6 flex items-end w-full">
						<div class="w-full mr-[60px]">
							<Label>
								<Select
									class="outline-none mt-2 bg-transparent rounded-none border-t-0 border-l-0 border-r-0 border-b border-solid"
									items={audiooutput}
									bind:value={$appSettings.speaker.deviceId}
									on:change={handleMarkAsChanged}
								/>
							</Label>
						</div>
						<Button class="">Test</Button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</Modal>
