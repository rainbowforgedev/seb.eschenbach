<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
</script>

<svelte:head>
	<title>Impressum — Sebastian Eschenbach</title>
</svelte:head>

<PageHeader />

<main>
	<p class="section-label">IMPRESSUM</p>

	<section>
		<h2>Angaben gemäß § 5 TMG</h2>
		<p>
			Sebastian Eschenbach<br />
			Musterstraße 1<br />
			12345 Musterstadt
		</p>
	</section>

	<section>
		<h2>Kontakt</h2>
		<p>
			Telefon: +49 000 0000000<br />
			E-Mail: <a href="mailto:seb.eschenbach@arcor.de">seb.eschenbach@arcor.de</a>
		</p>
	</section>

	<section>
		<h2>Urheberrecht</h2>
		<p>
			Alle Abbildungen auf dieser Website sind urheberrechtlich geschützte Werke von Sebastian
			Eschenbach. Jede Reproduktion, Verbreitung oder Veröffentlichung — auch auszugsweise —
			bedarf der ausdrücklichen Genehmigung des Urhebers.
		</p>
	</section>
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
		color: #888;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	h2 {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		color: #888;
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
