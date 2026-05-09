<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
	import { vitaPage } from '$lib/content';
</script>

<svelte:head>
	<title>Vita — S. Eschenbach</title>
	<meta name="description" content="Lebenslauf der Malerin S. Eschenbach" />
</svelte:head>

<PageHeader />

<main>
	<div class="vita-layout">
		<aside class="portrait">
			<img src={vitaPage.portrait} alt="S. Eschenbach" />
		</aside>

		<section class="bio">
			<h1>Vita</h1>
			<p class="bio-text">
				{vitaPage.body}
			</p>
		</section>
	</div>

	<section class="press">
		<img src={vitaPage.pressImage} alt="Zeitungsartikel" />
	</section>
</main>

<style>
	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 3rem 2rem 6rem;
	}

	.vita-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		margin-bottom: 4rem;
	}

	.portrait img {
		width: 100%;
		height: auto;
		border-bottom: 1px solid var(--color-border);
	}

	h1 {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #888;
		margin-bottom: 1.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	.bio {
		border-left: 1px solid var(--color-border);
		padding-left: 2rem;
	}

	.bio-text {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-ink);
	}

	.press {
		border-top: 1px solid var(--color-border);
		padding-top: 3rem;
	}

	.press img {
		width: 100%;
		height: auto;
		display: block;
	}

	@media (min-width: 768px) {
		.vita-layout {
			grid-template-columns: 280px 1fr;
			align-items: start;
		}

		.bio {
			padding-left: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.vita-layout {
			grid-template-columns: 320px 1fr;
		}

		main {
			padding: 3rem 3rem 6rem;
		}
	}
</style>
