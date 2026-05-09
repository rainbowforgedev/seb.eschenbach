<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { werk, prev, next } = $derived(data);
</script>

<svelte:head>
	<title>{werk.title} — S. Eschenbach</title>
	<meta name="description" content="{werk.title}, {werk.year}. {werk.technique}, {werk.dimensions}" />
	<meta property="og:title" content="{werk.title} — S. Eschenbach" />
	<meta property="og:image" content={werk.image} />
</svelte:head>

<PageHeader />

<main>
	<div class="artwork">
		<img src={werk.image} alt={werk.title} class="artwork-img" />

		<div class="meta">
			<dl>
				<div class="meta-row">
					<dt>Titel</dt>
					<dd>{werk.title}</dd>
				</div>
				<div class="meta-row">
					<dt>Jahr</dt>
					<dd>{werk.year}</dd>
				</div>
				<div class="meta-row">
					<dt>Technik</dt>
					<dd>{werk.technique}</dd>
				</div>
				<div class="meta-row">
					<dt>Maße</dt>
					<dd>{werk.dimensions}</dd>
				</div>
				{#if werk.status}
					<div class="meta-row">
						<dt>Status</dt>
						<dd>{werk.status}</dd>
					</div>
				{/if}
				{#if werk.price}
					<div class="meta-row">
						<dt>Preis</dt>
						<dd>{werk.price}</dd>
					</div>
				{/if}
				{#if werk.body}
					<div class="meta-row description">
						<dt>Beschreibung</dt>
						<dd>{werk.body}</dd>
					</div>
				{/if}
			</dl>
		</div>
	</div>

	<nav class="work-nav">
		<div class="work-nav-prev">
			{#if prev}
				<a href="/galerie/{prev.slug}">← {prev.title}</a>
			{/if}
		</div>
		<a href="/galerie" class="back">← Alle Werke</a>
		<div class="work-nav-next">
			{#if next}
				<a href="/galerie/{next.slug}">{next.title} →</a>
			{/if}
		</div>
	</nav>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem 5rem;
	}

	.artwork {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	.artwork-img {
		width: 100%;
		max-height: 80vh;
		object-fit: contain;
		background: #f5f3ef;
	}

	.meta {
		border-left: 1px solid var(--color-border);
		padding-left: 2rem;
	}

	dl {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.meta-row {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 1rem;
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.meta-row:first-child {
		border-top: 1px solid var(--color-border);
	}

	dt {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #888;
		padding-top: 0.1rem;
	}

	dd {
		font-family: var(--font-serif);
		font-size: 1rem;
		font-style: italic;
		overflow-wrap: break-word;
	}

	.description dt {
		padding-top: 0;
	}

	.description dd {
		font-style: normal;
		line-height: 1.6;
	}

	.work-nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 1rem;
		align-items: center;
		margin-top: 4rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.work-nav a {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		color: var(--color-ink);
		transition: opacity 0.15s;
	}

	.work-nav a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.work-nav-prev {
		text-align: left;
	}

	.work-nav-next {
		text-align: right;
	}

	.back {
		text-align: center;
		white-space: nowrap;
	}

	@media (min-width: 1024px) {
		.artwork {
			grid-template-columns: 1fr 320px;
			align-items: start;
		}

		main {
			padding: 3rem 3rem 5rem;
		}
	}

	@media (max-width: 640px) {
		.meta {
			border-left: none;
			padding-left: 0;
			border-top: 1px solid var(--color-border);
			padding-top: 1.5rem;
		}

		.meta-row {
			grid-template-columns: 90px 1fr;
		}

		.work-nav {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.work-nav-prev,
		.work-nav-next {
			text-align: center;
		}
	}
</style>
