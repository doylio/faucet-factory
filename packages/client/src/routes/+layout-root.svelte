<script lang="ts">
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { web3 } from '$lib/web3';
	import { onMount } from 'svelte';

	onMount(() => {
		web3.reconnect();
	});
</script>

<SvelteToast />
<slot />
