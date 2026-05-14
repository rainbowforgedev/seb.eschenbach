<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
</script>

<svelte:head>
	<title>privacy-policy — Sebastian Eschenbach</title>
</svelte:head>

<PageHeader />

<main>
	<h1 class="section-label">Privacy Policy</h1>
<p>Doesn't exist because this is a test.</p>
</main>

<style>
	main {
		max-width: 680px;
		margin: 0 auto;
		padding: 3rem 2rem 6rem;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.section-label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.2em;
		color: #666;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	h2 {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		color: #666;
		text-transform: uppercase;
		margin-bottom: 0.75rem;
	}

	p {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-ink);
	}

	a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (min-width: 1024px) {
		main {
			padding: 3rem 3rem 6rem;
		}
	}
</style>
