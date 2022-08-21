<script lang="ts">
	export let padding: string = '';
</script>

<div class="card" style="padding: {padding};">
	<slot />
</div>

<style>
	.card {
		background-color: var(--tertiary-color);
		border-radius: 12px;
		overflow: hidden;
	}
</style>
