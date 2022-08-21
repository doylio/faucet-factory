<script lang="ts">
	import OwnerView from './OwnerView.svelte';
	import UserView from './UserView.svelte';
</script>

{#if true}
	<OwnerView />
{:else}
	<UserView />
{/if}
