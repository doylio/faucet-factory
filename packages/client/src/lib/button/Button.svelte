<script lang="ts">
	export let href: string | undefined = undefined;
	export let width = '';
	export let type = '';
</script>

{#if href}
	<a {href}>
		<button style="width: {width};" {type}>
			<slot />
		</button>
	</a>
{:else}
	<button on:click style="width: {width};" {type}>
		<slot />
	</button>
{/if}

<style>
	button {
		background-color: var(--success);
		padding: 0.8em 1.6em;
		color: var(--pure-white);
		border-radius: 4px;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--success-light);
	}
</style>
