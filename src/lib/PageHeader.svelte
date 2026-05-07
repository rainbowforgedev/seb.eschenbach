<script lang="ts">
	import { page } from '$app/stores';
	import signature from '$lib/assets/images/sign.png';

	const links = [
		{ label: 'GALERIE', href: '/galerie' },
		{ label: 'VITA', href: '/vita' },
		{ label: 'AUSSTELLUNGEN', href: '/ausstellungen' },
		{ label: 'KONTAKT', href: '/kontakt' }
	];

	let pathname = $derived($page.url.pathname);
</script>

<header>
	<a href="/" class="logo">
		<img src={signature} alt="S. Eschenbach" />
	</a>
	<nav>
		{#each links as link}
			<a href={link.href} class:active={pathname.startsWith(link.href)}>{link.label}</a>
		{/each}
	</nav>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.9rem 2rem;
	}

	.logo {
		display: block;
		line-height: 0;
	}

	.logo img {
		height: 42px;
		width: auto;
		opacity: 0.85;
		transition: opacity 0.15s;
	}

	.logo:hover img {
		opacity: 1;
	}

	nav {
		display: flex;
		gap: 2.5rem;
	}

	nav a {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: var(--nav-letter-spacing);
		color: var(--color-ink);
		transition: opacity 0.15s;
	}

	nav a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	nav a.active {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	@media (max-width: 640px) {
		header {
			padding: 0.75rem 1.25rem;
		}
		nav {
			gap: 1.5rem;
		}
	}
</style>
