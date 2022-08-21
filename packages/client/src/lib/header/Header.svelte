<script lang="ts">
	import { page } from '$app/stores';
	import logo from './FaucetHound_white.png';
	import { web3 } from '../web3';
	import Button from '$lib/button/Button.svelte';

	$: console.log($web3);
</script>

<header>
	<a class="branding" href="/">
		<img src={logo} alt="Faucet Hound" />
		Faucet Hound
	</a>

	<div class="wallet">
		{#if $web3.address}
			<p>USER ACCOUNT</p>
			<p>NETWORK</p>
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
		background-color: var(--branding-color);
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
		display: flex;
		align-items: center;
	}

	@media (min-width: 720px) {
		header {
			padding: 1em 5em;
		}
		.branding {
			font-size: 1.8em;
		}
	}
</style>
