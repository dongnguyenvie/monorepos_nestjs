<script lang="ts">
	import SettingWebcamsDialog from '../dialogs/setting-webcams-dialog.svelte';
	export let onDeviceChanged = () => {};
	export let onOpenChanged = (flg: boolean) => {};

	let isSettingChanged = false;
	let isOpen = false;

	const handleReset = () => {
		isSettingChanged = false;
		isOpen = false;
	};

	const handleToggleDialog = () => {
		isOpen = !isOpen;
	};

	const handleCloseDialog = () => {
		if (isSettingChanged) {
			onDeviceChanged();
		}
		handleReset();
	};

	const handleMarkAsChanged = () => {
		isSettingChanged = true;
	};
</script>

<button on:click={handleToggleDialog}>[Setting Device]</button>
<SettingWebcamsDialog {isOpen} onClose={handleCloseDialog} onChange={handleMarkAsChanged} />
