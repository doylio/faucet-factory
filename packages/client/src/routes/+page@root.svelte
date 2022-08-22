<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import logo from '$lib/header/FaucetHound_white.png';
	import { web3 } from '$lib/web3';
	import { goto } from '$app/navigation';

	$: if ($web3.signer) goto('/dashboard');
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<header>
	<div class="branding">
		<img src={logo} alt="Fauct Hound Logo" />
		<h1>Faucet Hound</h1>
	</div>
</header>

<section>
	<div class="demo-img">
		<!-- <img /> -->
	</div>
	<div class="text-box">
		<h1>Create a testnet faucet in seconds!</h1>
		<p>
			Select the EVM network you want to use, set the parameters, and get a custom ERC20 token
			faucet with a link for your users
		</p>
		<Button on:click={web3.connect}>Connect Wallet</Button>
	</div>
</section>

<style>
	header {
		height: 34vh;
		background-color: var(--branding);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.branding {
		display: flex;
		align-items: center;
	}
	.branding img {
		width: 10em;
		height: 10em;
		object-fit: contain;
		margin-right: 1em;
	}

	.branding h1 {
		color: var(--pure-white);
		font-size: 4em;
	}

	section {
		height: 66vh;
		background-color: var(--primary-color);
		background: linear-gradient(180deg, var(--primary-color) 0%, var(--secondary-color) 15%);
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 3em;
		flex-wrap: wrap;
	}

	.text-box,
	.demo-img {
		min-width: 300px;
		max-width: 500px;
		flex: 1;
	}

	.demo-img {
		display: block;
		height: 300px;
		border: 1px solid black;
		margin-right: 1em;
	}

	.text-box h1 {
		margin-top: 0.5em;
	}

	.text-box {
		text-align: center;
	}

	.text-box p {
		font-size: 1.2em;
	}
</style>
