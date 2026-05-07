<script lang="ts">
	import { onMount } from 'svelte';
	import HomeNav from '$lib/HomeNav.svelte';

	onMount(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:head>
	<title>S. Eschenbach — Malerei</title>
	<meta name="description" content="Portfolio der Malerin S. Eschenbach" />
</svelte:head>

<div class="frame">
	<div class="hero" style:background-image="url(/bg-1.jpg)">
		<HomeNav />
	</div>
</div>

<style>
	.frame {
		position: fixed;
		inset: var(--frame-inset);
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 4px;
		overflow: hidden;
	}

	.hero {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
	}
</style>
