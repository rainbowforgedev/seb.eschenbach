<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
	import { werke } from '$lib/content';
</script>

<svelte:head>
	<title>Galerie — S. Eschenbach</title>
	<meta name="description" content="Werkübersicht der Malerin S. Eschenbach" />
</svelte:head>

<PageHeader />

<main>
	<div class="grid">
		{#each werke as werk}
			<a href="/galerie/{werk.slug}" class="card">
				<div class="img-wrap">
					<img src={werk.image} alt={werk.title} loading="lazy" />
					<div class="overlay">
						<span class="overlay-title">{werk.title}</span>
						<span class="overlay-year">{werk.year}</span>
					</div>
				</div>
				<div class="caption">
					<span class="caption-title">{werk.title}</span>
					<span class="caption-year">{werk.year}</span>
				</div>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 3rem 2rem 4rem;
		min-height: calc(100vh - 49px);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1px;
		background-color: var(--color-border);
		border: 1px solid var(--color-border);
	}

	.card {
		display: block;
		background: var(--color-bg);
	}

	.img-wrap {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
	}

	.img-wrap img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.card:hover .img-wrap img {
		transform: scale(1.03);
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: rgba(17, 17, 17, 0.68);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		opacity: 0;
		transition: opacity 0.25s ease;
	}

	.card:hover .overlay {
		opacity: 1;
	}

	.overlay-title {
		font-family: var(--font-serif);
		font-size: 1.1rem;
		color: var(--color-bg);
		font-style: italic;
	}

	.overlay-year {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		color: var(--color-border);
	}

	.caption {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 0.6rem 0.75rem;
		border-top: 1px solid var(--color-border);
	}

	.caption-title {
		font-family: var(--font-serif);
		font-size: 0.9rem;
		font-style: italic;
	}

	.caption-year {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		color: #888;
	}

	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
		main {
			padding: 3rem 3rem 5rem;
		}
	}

	@media (min-width: 1440px) {
		main {
			padding: 3rem 4rem 5rem;
		}
	}
</style>
