<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import Footer from '$lib/Footer.svelte';
	import signIcon from '$lib/assets/images/RFIconLettersOnly.webP';

	let { children } = $props();
	let isHome = $derived($page.url.pathname === '/');

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Sebastian Eschenbach',
		jobTitle: 'Maler',
		description:
			'Maler aus der Uckermark, Brandenburg. Großformatige Landschaftsmalerei in Öl, Zeichnung und Aquarell.',
		url: 'https://sebastian-eschenbach.de',
		address: {
			'@type': 'PostalAddress',
			addressRegion: 'Uckermark',
			addressCountry: 'DE'
		}
	};
</script>

<svelte:head>
	<link rel="icon" href={signIcon} type="image/png" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

{@render children()}
{#if !isHome}
	<Footer />
{/if}
