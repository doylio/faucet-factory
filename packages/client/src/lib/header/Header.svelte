<script lang="ts">
	import { page } from '$app/stores';
	import logo from './FaucetHound_white.png';
	import { NETWORKS, web3 } from '../web3';
	import Button from '$lib/button/Button.svelte';
	import { truncateAddress } from '$lib/utils';

	$: console.log($web3);

	let ensName = '';
	$: if ($web3.provider && $web3.address) {
		$web3.provider.lookupAddress($web3.address).then((resolved) => {
			if (resolved) ensName = resolved;
			else ensName = '';
		});
	}

	let truncatedAddress: string;
	$: truncatedAddress = $web3.address ? truncateAddress($web3.address) : '';
</script>

<header>
	<a class="branding" href="/">
		<img src={logo} alt="Faucet Hound" />
		Faucet Hound
	</a>

	<div class="wallet">
		{#if $web3.address}
			<button class="address" on:click={web3.changeAccount}>
				{ensName || truncatedAddress}
			</button>
			<select class="network-select">
				{#each NETWORKS as network}
					<option value={network.chainId}>{network.name}</option>
				{/each}
			</select>
		{:else}
			<Button on:click={web3.connect}>Connect Wallet</Button>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		height: var(--nav-height);
		background-color: var(--branding);
		padding: 1em;
	}

	.branding {
		color: var(--pure-white);
		font-size: 1.5em;
		display: flex;
		align-items: center;
		font-weight: 500;
	}

	.branding img {
		width: 1.3em;
		height: 1.3em;
		object-fit: contain;
		margin-right: 0.5em;
	}

	.wallet {
		padding: 5px 0;
		display: flex;
		align-items: center;
		font-size: 0.85rem;
	}

	.address {
		display: none;
		background-color: var(--branding-dark);
		padding: 0.7em 1em;
		border-radius: 8px;
		color: var(--pure-white);
		border: none;
		cursor: pointer;
	}

	.network-select {
		height: 35px;
		padding: 0.5em;
		background-color: var(--branding-dark);
		border-radius: 8px;
		margin-left: 0.5em;
		border: none;
		color: var(--pure-white);
		font-family: var(--font-family);
		cursor: pointer;
		text-align: center;
	}

	.address:hover,
	.network-select:hover {
		background-color: var(--tertiary-color);
		color: var(--branding-dark);
	}

	@media (min-width: 720px) {
		header {
			padding: 1em 5em;
		}
		.branding {
			font-size: 1.8em;
		}
		.address {
			display: inline;
		}
	}
</style>
