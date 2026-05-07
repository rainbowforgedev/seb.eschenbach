<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
</script>

<svelte:head>
	<title>Datenschutz — Sebastian Eschenbach</title>
</svelte:head>

<PageHeader />

<main>
	<p class="section-label">DATENSCHUTZERKLÄRUNG</p>

	<section>
		<h2>Verantwortlicher</h2>
		<p>
			Sebastian Eschenbach<br />
			Musterstraße 1<br />
			12345 Musterstadt<br />
			E-Mail: <a href="mailto:seb.eschenbach@arcor.de">seb.eschenbach@arcor.de</a>
		</p>
	</section>

	<section>
		<h2>Erhebung und Verwendung von Daten</h2>
		<p>
			Diese Website erhebt keine personenbezogenen Daten, außer jenen, die Sie uns über das
			Kontaktformular freiwillig mitteilen. Die übermittelten Daten (E-Mail-Adresse und Nachricht)
			werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet und nicht an Dritte
			weitergegeben.
		</p>
	</section>

	<section>
		<h2>Hosting</h2>
		<p>
			Diese Website wird über Cloudflare Workers gehostet. Cloudflare kann dabei technisch bedingt
			Verbindungsdaten verarbeiten. Weitere Informationen finden Sie in der
			<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">
				Datenschutzerklärung von Cloudflare</a
			>.
		</p>
	</section>

	<section>
		<h2>E-Mail-Versand</h2>
		<p>
			Nachrichten aus dem Kontaktformular werden über den Dienst Resend versendet. Dabei wird Ihre
			E-Mail-Adresse und Nachricht an die Server von Resend übermittelt. Weitere Informationen unter
			<a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener">
				resend.com/legal/privacy-policy</a
			>.
		</p>
	</section>

	<section>
		<h2>Ihre Rechte</h2>
		<p>
			Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung Ihrer gespeicherten
			Daten. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.
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
