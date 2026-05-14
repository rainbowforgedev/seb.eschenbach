<script lang="ts">
	import { page } from '$app/stores';
	import PageHeader from '$lib/PageHeader.svelte';
</script>

<svelte:head>
	<title>{$page.status} — S. RF</title>
	<meta name="description" content="Diese Seite wurde nicht gefunden." />
</svelte:head>

<PageHeader />

<main>
	<p class="code">{$page.status}</p>
	<p class="message">{$page.error?.message ?? 'Seite nicht gefunden'}</p>
	<a href="/">← Zurück zur Startseite</a>
</main>

<style>
	main {
		max-width: 600px;
		margin: 6rem auto;
		padding: 0 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.code {
		font-family: var(--font-mono);
		font-size: 4rem;
		letter-spacing: 0.1em;
		color: var(--color-border);
	}

	.message {
		font-family: var(--font-serif);
		font-size: 1.1rem;
		font-style: italic;
		color: var(--color-ink);
	}

	a {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		color: var(--color-ink);
		margin-top: 1rem;
	}

	a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
