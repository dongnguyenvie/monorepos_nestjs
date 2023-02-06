<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/@core/constants';
	import RingIcon from '$lib/icons/ic_ring.svg';
	import UserGroupIcon from '$lib/icons/ic_user_group.svg';
	import { logout, userPicture } from '$lib/state';
	import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
	import Authencation from '../authencation.svelte';
	import Button from '../button.svelte';

	export let className: string = '';

	const handleGotoLoginPage = () => {
		goto(ROUTES.login);
	};
</script>

<header class={`sticky top-0 left-0 z-20 flex justify-end px-5 py-2 bg-white ${className}`}>
	<Authencation>
		<div class="">
			<ul class="flex items-center gap-x-[32px]">
				<!-- <li>
					<img src={FlagEnIcon} alt="" />
				</li> -->
				<li>
					<img src={RingIcon} alt="" />
				</li>
				<li>
					<img src={UserGroupIcon} alt="" />
				</li>
				<li>
					<img
						src={$userPicture}
						alt=""
						class="w-[44px] h-[44px] rounded-full border border-gray-500 cursor-pointer"
					/>
					<Dropdown>
						<DropdownItem class="opacity-50 cursor-not-allowed">Settings</DropdownItem>
						<DropdownDivider />
						<DropdownItem on:click={logout}>Sign out</DropdownItem>
					</Dropdown>
				</li>
			</ul>
		</div>
	</Authencation>
	<Authencation showIfNotLoggedIn>
		<Button className="bg-main-500 rounded-lg hover:bg-main-800" onClick={handleGotoLoginPage}
			>Đăng nhập</Button
		>
	</Authencation>
</header>

<style>
</style>
