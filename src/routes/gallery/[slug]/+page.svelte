<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import PageHeader from '$lib/PageHeader.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let { work, prev, next } = $derived(data);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft' && prev) goto(`/gallery/${prev.slug}`);
		if (e.key === 'ArrowRight' && next) goto(`/gallery/${next.slug}`);
	}

	let touchStartX = 0;

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		const diff = touchStartX - e.changedTouches[0].clientX;
		if (Math.abs(diff) < 50) return;
		if (diff > 0 && next) goto(`/gallery/${next.slug}`);
		if (diff < 0 && prev) goto(`/gallery/${prev.slug}`);
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<svelte:head>
	<title>{work.title} ({work.year}) — Rainbow Forge</title>
	<meta name="description" content="{work.title} ({work.year}) — {work.technique}, {work.dimensions}. work des Malers Rainbow Forge aus der Uckermark, Brandenburg." />
	<meta property="og:title" content="{work.title} — Rainbow Forge" />
	<meta property="og:description" content="{work.title} ({work.year}), {work.technique}, {work.dimensions}." />
	<meta property="og:image" content="https://sebastian-RF.de{work.image}" />
	<meta property="og:type" content="article" />
</svelte:head>

<PageHeader />

<main ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
	<div class="artworks">
		<img src={work.image} alt={work.title} class="artworks-img" width="1200" height="900" fetchpriority="high" />

		<div class="meta">
			<dl>
				<div class="meta-row">
					<dt>Titel</dt>
					<dd>{work.title}</dd>
				</div>
				<div class="meta-row">
					<dt>Jahr</dt>
					<dd>{work.year}</dd>
				</div>
				<div class="meta-row">
					<dt>Technik</dt>
					<dd>{work.technique}</dd>
				</div>
				<div class="meta-row">
					<dt>Maße</dt>
					<dd>{work.dimensions}</dd>
				</div>
				{#if work.status}
					<div class="meta-row">
						<dt>Status</dt>
						<dd>{work.status}</dd>
					</div>
				{/if}
				{#if work.price}
					<div class="meta-row">
						<dt>Preis</dt>
						<dd>{work.price}</dd>
					</div>
				{/if}
				{#if work.body}
					<div class="meta-row description">
						<dt>Beschreibung</dt>
						<dd>{work.body}</dd>
					</div>
				{/if}
			</dl>
		</div>
	</div>

	<nav class="works-nav">
		<div class="works-nav-prev">
			{#if prev}
				<a href="/gallery/{prev.slug}">← {prev.title}</a>
			{/if}
		</div>
		<a href="/gallery" class="back">← Alle works</a>
		<div class="works-nav-next">
			{#if next}
				<a href="/gallery/{next.slug}">{next.title} →</a>
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

	.artworks {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	.artworks-img {
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
		color: #666;
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

	.works-nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 1rem;
		align-items: center;
		margin-top: 4rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.works-nav a {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		color: var(--color-ink);
		transition: opacity 0.15s;
	}

	.works-nav a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.works-nav-prev {
		text-align: left;
	}

	.works-nav-next {
		text-align: right;
	}

	.back {
		text-align: center;
		white-space: nowrap;
	}

	@media (min-width: 1024px) {
		.artworks {
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

		.works-nav {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.works-nav-prev,
		.works-nav-next {
			text-align: center;
		}
	}
</style>
