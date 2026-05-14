<script lang="ts">
	import { page } from '$app/stores';
	import signature from '$lib/assets/images/RFIconLettersOnly.webP';

	let {
		pos = 'center',
		highlightColor = '#ffffff',
		textColor = '#ffffff',
		currentPage = $page.url.pathname.slice(1)
	} = $props();

	const links = [
		{ name: 'Atelier', href: '/Atelier' },
		{ name: 'Ausstellung', href: '/Ausstellung' },
		{ name: 'gallery', href: '/gallery' },
		{ name: 'about', href: '/about' }
	];
</script>

<nav class="nav-{pos}" style="--highlight: {highlightColor}; --text: {textColor};">
	<div class="signature-link">
		<a href="/">
			<img src={signature} alt="Signature" class="signature-img" />
		</a>
	</div>
	{#each links as link}
		<h2>
			<a
				href={link.href}
				class:active={currentPage === link.href.slice(1).toLowerCase()}
				style="color: var(--text);"
			>
				{link.name}
			</a>
		</h2>
	{/each}
</nav>

<style>
	:global(.nav-top) {
		position: fixed;
		top: 0;
		width: 100%;
	}
	:global(.nav-center) {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	:global(.nav-bottom) {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	:global(.nav-right-bottom) {
		position: fixed;
		right: 20%;
		bottom: 0;
		width: 100%;
	}
	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem; /* Wenig Abstand zwischen allem */
		padding: 1rem;
	}

	h1 {
		font-size: 2rem; /* RIESIG */
		font-weight: bold;
		margin: 0;
		text-align: center;
		color: var(--text);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	h2 {
		font-size: 2.5rem; /* Groß */
		margin: 0.2rem 0; /* Minimaler Abstand */
		text-align: center;
	}

	a {
		text-decoration: none;
		transition: all 0.3s ease;
		color: var(--text);
		font-weight: 500;
	}

	a.active {
		color: var(--highlight) !important;
		font-weight: 900;
		text-shadow: 0 0 10px var(--highlight);
	}

	.signature-link {
		display: flex;
		justify-content: center;
		margin: 0.2rem 0; /* Minimal zum h1/links */
	}

	.signature-img {
		width: 500px; /* GRÖSSER */
		height: auto;
		max-width: 90vw;
		opacity: 0.95;
		border-radius: 10px; /* Rundung */
		transition: all 0.3s ease;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 3rem;
		}
		h2 {
			font-size: 2rem;
		}
		.signature-img {
			width: 400px;
		}
	}
</style>
