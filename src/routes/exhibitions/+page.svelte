<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
	import PostcardCard from '$lib/PostcardCard.svelte';
	import { exhibitions } from '$lib/content';

	const current = exhibitions.find((a) => a.isCurrent);
	const past = exhibitions.filter((a) => !a.isCurrent);
</script>

<svelte:head>
	<title>exhibitions — Rainbow Forge, Maler</title>
	<meta name="description" content="exhibitions des Malers Rainbow Forge: Landschaftsmalerei der Uckermark im Dominikanerkloster Prenzlau, Rathaus Angermünde, Kunstpavillon Neuruppin und weiteren Orten." />
	<meta property="og:title" content="exhibitions — Rainbow Forge" />
	<meta property="og:description" content="Aktuelle und vergangene exhibitions des Malers Rainbow Forge aus der Uckermark." />
	<meta property="og:type" content="website" />
</svelte:head>

<PageHeader />

<main>
	{#if current}
		<section class="featured">
			<p class="section-label">AKTUELLE AUSSTELLUNG</p>
			<div class="featured-card" class:is-portrait={current.orientation !== 'landscape'}>
				<PostcardCard ausstellung={current} featured />
			</div>
			<div class="card-meta">
				<span class="meta-title">{current.title}</span>
				<span class="meta-sep">·</span>
				<span class="meta-dates">{current.dateFrom} – {current.dateTo}</span>
				<span class="meta-sep">·</span>
				<span class="meta-location">{current.location}</span>
			</div>
		</section>
	{/if}

	{#if past.length > 0}
		<section class="past">
			<p class="section-label">VERGANGENE exhibitions</p>
			<div class="grid">
				{#each past as a}
					<div class="card-wrap">
						<PostcardCard ausstellung={a} />
						<div class="card-meta">
							<span class="meta-title">{a.title}</span>
							<span class="meta-sep">·</span>
							<span class="meta-dates">{a.dateFrom} – {a.dateTo}</span>
							<span class="meta-sep">·</span>
							<span class="meta-location">{a.location}</span>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</main>

<style>
	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 3rem 2rem 6rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.section-label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.2em;
		color: #666;
		margin-bottom: 1.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	/* ── Featured ── */
	.featured-card {
		max-width: 580px;
		margin: 0 auto;
	}

	/* Portrait card: narrower width → taller height, feels like a real postcard */
	.featured-card.is-portrait {
		max-width: 340px;
	}

	/* ── Past grid ── */
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	/* ── Meta below each card ── */
	.card-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		color: #666;
	}

	.meta-title {
		color: var(--color-ink);
		font-style: normal;
	}

	.meta-sep {
		color: var(--color-border);
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1024px) {
		main {
			padding: 3rem 3rem 6rem;
		}
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.card-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.15rem;
		}

		.meta-sep {
			display: none;
		}
	}
</style>
