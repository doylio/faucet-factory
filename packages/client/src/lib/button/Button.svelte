<script lang="ts">
	export let href: string | undefined = undefined;
	export let width = '';
</script>

{#if href}
	<a {href}>
		<button style="width: {width};">
			<slot />
		</button>
	</a>
{:else}
	<button on:click style="width: {width};">
		<slot />
	</button>
{/if}

<style>
	button {
		background-color: var(--action-color);
		padding: 0.8em 1.6em;
		color: var(--pure-white);
		border-radius: 4px;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--action-hover);
	}
</style>
