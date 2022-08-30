<script lang="ts">
	import logo from './FaucetHound_white.png';
	import { web3 } from '../web3';
	import { NETWORKS } from '$lib/networks';
	import Button from '$lib/button/Button.svelte';
	import { truncateAddress } from '$lib/utils';

	let ensName = '';
	$: if ($web3.provider && $web3.address) {
		$web3.provider
			.lookupAddress($web3.address)
			.then((resolved) => {
				if (resolved) ensName = resolved;
				else ensName = '';
			})
			.catch(() => {});
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
			<div class="network-dropdown">
				<svg
					class="chevron"
					width="18"
					height="10"
					viewBox="0 0 22 13"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2 2L11 11L20 2"
						stroke="white"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<select class="network-select" value={$web3.chainId}>
					{#each NETWORKS as network}
						<option value={network.chainId}>{network.name}</option>
					{/each}
				</select>
			</div>
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

	.network-dropdown {
		position: relative;
		margin-left: 0.5em;
		background-color: var(--branding-dark);
		color: var(--pure-white);
		stroke: var(--pure-white);
		border-radius: 8px;
		overflow: hidden;
		padding: 0;
	}

	.network-dropdown:hover,
	.address:hover {
		background-color: var(--tertiary-color);
		color: var(--branding-dark);
		stroke: var(--branding-dark);
	}

	.network-select {
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		height: 35px;
		padding: 0.5em;
		padding-right: 30px;
		background-color: inherit;
		color: inherit;
		border: none;
		font-family: var(--font-family);
		font-weight: 400;
		cursor: pointer;
		text-align: left;
	}

	.network-select:focus {
		outline-style: none;
	}

	.chevron {
		position: absolute;
		right: 10px;
		top: 13px;
	}
	.chevron path {
		stroke: inherit;
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
