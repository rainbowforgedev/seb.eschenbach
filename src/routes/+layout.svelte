<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import Footer from '$lib/Footer.svelte';

	let { children } = $props();
	let isHome = $derived($page.url.pathname === '/');
</script>

{@render children()}
{#if !isHome}
	<Footer />
{/if}
