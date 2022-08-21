<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import HeaderCard from './HeaderCard.svelte';

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

<HeaderCard name="TOKEN_NAME" symbol="SYM">CONTENT</HeaderCard>
