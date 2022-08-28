<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/button/Button.svelte';
	import Card from '$lib/card/Card.svelte';
	import toast from '$lib/toast';
	import { web3, faucetFactory } from '$lib/web3';
	import { ethers, BigNumber } from 'ethers';
	import { Stretch } from 'svelte-loading-spinners';

	let awaitingWallet = false;
	let submittingTx = false;
	async function handleSubmit(e: any) {
		e.preventDefault();
		if (submittingTx || awaitingWallet) return;
		try {
			const formData = new FormData(e.target);
			const newAddress = await createNewFaucet(formData);
			goto(`/faucets/${newAddress}`);
		} catch (err) {
			console.log(err);
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error('Something went wrong');
			}
		} finally {
			awaitingWallet = false;
			submittingTx = false;
		}
	}

	async function createNewFaucet(formData: FormData) {
		if (!$faucetFactory) throw new Error('Contract not detected');
		const factory = $faucetFactory;

		const name = formData.get('name') as string;
		const symbol = formData.get('symbol') as string;
		const decimals = Number(formData.get('decimals'));
		const dropletAmountUnits = formData.get('dropletAmount') as string;
		const dropletAmount = ethers.utils.parseUnits(dropletAmountUnits, decimals);
		const claimInterval = BigNumber.from(formData.get('claimInterval'));
		const tokenImageUrl = formData.get('tokenImageUrl') as string;

		awaitingWallet = true;
		const tx = await factory.createFaucetToken(
			name,
			symbol,
			tokenImageUrl,
			decimals,
			dropletAmount,
			claimInterval
		);
		awaitingWallet = false;

		submittingTx = true;
		const receipt = await tx.wait();
		submittingTx = false;

		const parsedLogs = receipt.logs.map((log) => factory.interface.parseLog(log));
		const newFaucetLog = parsedLogs.find((log) => log.name === 'NewFaucet');
		if (!newFaucetLog) throw new Error('Unable to detect new contract address');
		return newFaucetLog.args.faucet as string;
	}
</script>

<Card padding="1em">
	<h1>Create Faucet</h1>
	<form on:submit={(e) => handleSubmit(e)}>
		<div class="form-row">
			<label for="name"> Token Name*</label>
			<input name="name" required type="text" placeholder="Test Stablecoin" />
		</div>
		<div class="form-row">
			<label for="symbol"> Symbol* </label>
			<input name="symbol" required type="text" placeholder="STBL" />
		</div>
		<div class="form-row">
			<label for="decimals"> Decimals* </label>
			<input name="decimals" required type="number" min="0" placeholder="18" />
		</div>
		<div class="form-row">
			<label for="dropletAmount"> Droplet Amount* </label>
			<input name="dropletAmount" required type="number" min="0" placeholder="1000" />
		</div>
		<div class="form-row">
			<label for="claimInterval"> Claim Interval (seconds)* </label>
			<input name="claimInterval" required type="number" min="0" placeholder="3600" />
		</div>
		<div class="form-row">
			<label for="tokenImageUrl"> Token Image URL </label>
			<input name="tokenImageUrl" type="text" placeholder="https://imgur.com/my-image" />
		</div>

		<div class="submit-button">
			{#if awaitingWallet}
				<em>Confirm the transaction in your wallet</em>
			{:else if submittingTx}
				<Stretch color="#E08700" />
			{:else}
				<Button type="submit">Create Faucet</Button>
			{/if}
		</div>
	</form>
</Card>

<style>
	h1 {
		text-align: center;
	}

	form {
		padding: 1em 3em;
	}

	.form-row {
		display: flex;
		margin: 0.5em;
		align-items: center;
	}

	.form-row label {
		flex: 2;
	}

	.form-row input {
		flex: 3;
	}

	.form-row input[type='number'],
	.form-row input[type='text'] {
		padding: 8px 12px;
		background-color: var(--secondary-color);
		border: none;
		border-radius: 4px;
	}

	.submit-button {
		margin-top: 3em;
		display: flex;
		justify-content: center;
	}

	.submit-button em {
		color: var(--branding);
	}
</style>
