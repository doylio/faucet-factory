<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import Card from '$lib/card/Card.svelte';
	import HeaderCard from './HeaderCard.svelte';
	// import ethers from 'ethers';

	const copyLinkToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
	};

	const handleMint = () => {};
	const handleUpdate = () => {};

	let recentClaims: {
		address: string;
		transactionHash: string;
		timestamp: number;
		amount: number;
	}[] = [];
	for (let i = 0; i < 10; i++) {
		recentClaims.push({
			address: '1209847129071029372',
			transactionHash: '23p04789123p098123912841412412312',
			timestamp: Math.floor(Math.random() * Date.now()),
			amount: 9000
		});
	}
</script>

<HeaderCard name="TOKEN_NAME" symbol="SYM">
	<div class="header-content">
		<div>NUM tokens every NUM days</div>
		<div class="copy-link" on:click={copyLinkToClipboard}>Copy link to faucet</div>
	</div>
</HeaderCard>

<br />
<br />

<Card padding="1em 2em">
	<h2>Mint Tokens</h2>
	<div class="form">
		<div class="input-box">
			<label for="recipient">Recipient Address</label>
			<input name="recipient" placeholder="0x00000000000000000000" />
		</div>
		<div class="input-box">
			<label for="amount">Amount</label>
			<input name="amount" placeholder="100.00" type="number" />
		</div>
		<Button width="100px" on:click={handleMint}>Mint</Button>
	</div>
</Card>

<br />

<Card padding="1em 2em">
	<h2>Update Parameters</h2>
	<div class="form">
		<div class="input-box">
			<label for="dropletAmount">Droplet Amount</label>
			<input name="dropletAmount" placeholder="1000.00" type="number" />
		</div>
		<div class="input-box">
			<label for="claimInterval">Claim Interval (seconds)</label>
			<input name="claimInterval" placeholder="3600" type="number" />
		</div>
		<Button width="100px" on:click={handleUpdate}>Update</Button>
	</div>
</Card>

<br />
<br />

<div class="table-title">
	<h2>Recent Claims</h2>
	<strong>
		<a href="#">View all</a>
	</strong>
</div>
<table cellspacing="0">
	<thead style="background-color: --var(primary-color);">
		<th>Claimed By</th>
		<th>Amount</th>
		<th>Claimed At</th>
		<th />
	</thead>
	<tbody>
		{#each recentClaims as claim}
			<tr>
				<td>{claim.address}</td>
				<td>{claim.amount} TOK</td>
				<td>{claim.timestamp}</td>
				<td><a href="#">Transaction</a></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.header-content {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.copy-link {
		color: var(--branding);
		cursor: pointer;
	}

	.form {
		margin: 0.5em 0;
		display: flex;
		justify-content: space-between;
	}

	.input-box {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-right: 1em;
	}

	input {
		margin-top: 4px;
		padding: 8px 12px;
		background-color: var(--secondary-color);
		border: none;
		border-radius: 4px;
	}

	.table-title {
		margin-bottom: 0.5em;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	table {
		width: 100%;
		background-color: var(--tertiary-color);
		border-radius: 8px;
		overflow: hidden;
	}

	thead {
		background-color: var(--primary-color);
		text-align: left;
		color: var(--heading-color);
	}

	td,
	th {
		padding: 0.3em;
	}
</style>
