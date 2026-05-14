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
	<title>Rainbow Forge — Maler aus der Uckermark</title>
	<meta name="description" content="Rainbow Forge ist Maler und lebt seit über zwanzig Jahren in der Uckermark. Großformatige Ölgemälde, Zeichnungen und Aquarelle der brandenburgischen Landschaft." />
	<meta property="og:title" content="Rainbow Forge — Maler aus der Uckermark" />
	<meta property="og:description" content="Großformatige Ölgemälde, Zeichnungen und Aquarelle der brandenburgischen Landschaft." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://sebastian-RF.de" />
	<link rel="preload" as="image" href="/bg-1.webp" />
</svelte:head>

<div class="frame">
	<div class="hero" style:background-image="url(/bg-1.webp)">
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
