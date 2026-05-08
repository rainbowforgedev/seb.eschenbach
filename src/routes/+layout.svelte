<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import Footer from '$lib/Footer.svelte';
	import signIcon from '$lib/assets/images/signiture.png';

	let { children } = $props();
	let isHome = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="icon" href={signIcon} type="image/png" />
</svelte:head>

{@render children()}
{#if !isHome}
	<Footer />
{/if}
