<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
	import { works } from '$lib/content';
</script>

<svelte:head>
	<title>gallery — Sebastian Eschenbach, Maler aus der Uckermark</title>
	<meta name="description" content="workübersicht von Sebastian Eschenbach: Ölgemälde, Zeichnungen und Aquarelle — Birken, Wälder und Felder der Uckermark in Brandenburg." />
	<meta property="og:title" content="gallery — Sebastian Eschenbach" />
	<meta property="og:description" content="Ölgemälde, Zeichnungen und Aquarelle der Uckermark." />
	<meta property="og:type" content="website" />
</svelte:head>

<PageHeader />

<main>
	<div class="grid">
		{#each works as work, i}
			<a href="/gallery/{work.slug}" class="card">
				<div class="img-wrap">
					<img
						src={work.image}
						alt={work.title}
						width="4"
						height="3"
						loading={i < 4 ? 'eager' : 'lazy'}
						fetchpriority={i === 0 ? 'high' : undefined}
					/>
					<div class="overlay">
						<span class="overlay-title">{work.title}</span>
						<span class="overlay-year">{work.year}</span>
					</div>
				</div>
				<div class="caption">
					<span class="caption-title">{work.title}</span>
					<span class="caption-year">{work.year}</span>
				</div>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 3rem 2rem 4rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border: 1px solid var(--color-border);
		overflow: hidden;
	}

	.card {
		display: block;
		background: var(--color-bg);
		box-shadow:
			1px 0 0 0 var(--color-border),
			0 1px 0 0 var(--color-border);
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
		color: #666;
	}

	@media (max-width: 480px) {
		main {
			padding: 1.5rem 0.75rem 3rem;
		}
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
