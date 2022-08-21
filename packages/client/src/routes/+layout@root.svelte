<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	// import '../app.css';
</script>

<Header />
<div class="background">
	<main>
		<slot />
	</main>
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.background {
		min-height: calc(100vh - var(--nav-height));
		background-color: var(--primary-color);
		background: linear-gradient(
			180deg,
			var(--primary-color) 0%,
			var(--secondary-color) 10.45% /* var(--tertiary-color) 41.35% */
		);
		display: flex;
		flex-direction: column;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 780px;
		margin: 3rem auto 0;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
