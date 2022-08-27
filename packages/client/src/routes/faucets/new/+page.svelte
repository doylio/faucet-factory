<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import Card from '$lib/card/Card.svelte';

	function handleSubmit(e: any) {
		const formData = new FormData(e.target);
	}
</script>

<Card padding="1em">
	<h1>Create Faucet</h1>
	<form on:submit|preventDefault={handleSubmit}>
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
			<label for="tokenImage"> Token Image </label>
			<input name="tokenImage" type="file" />
		</div>

		<div class="submit-button">
			<Button type="submit">Create Faucet</Button>
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
</style>
