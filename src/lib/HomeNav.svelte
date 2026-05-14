<script lang="ts">
	import signature from '$lib/assets/images/RFIconLettersOnly.webP';

	const links = [
		{label: 'EXHIBITIONS', href:'/exhibitions'},
		{ label: 'gallery', href: '/gallery' },
		{ label: 'about', href: '/about' },
		{ label: 'CONTACT', href: '/contact' }
	];
</script>

<div class="home-nav">
	<a href="/" class="sig-link">
		<img src={signature} alt="S. Eschenbach" class="sig-img" />
	</a>
	<nav>
		{#each links as link}
			<a href={link.href}>{link.label}</a>
		{/each}
	</nav>
</div>

<style>
	.home-nav {
		position: absolute;
		bottom: 8vh;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		white-space: nowrap;
	}

	.sig-link {
		display: block;
	}

	.sig-img {
		width: 360px;
		max-width: min(80vw, 360px);
		height: auto;
	}

	nav {
		display: flex;
		gap: 3rem;
		align-items: center;
	}

	nav a {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: var(--nav-letter-spacing);
		color: #edeae4;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
		transition: text-decoration 0.15s;
	}

	nav a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	@media (max-width: 480px) {
		.home-nav {
			width: 90%;
			gap: 1.25rem;
		}
		nav {
			gap: 0.5rem;
			flex-wrap: wrap;
			justify-content: center;
		}
		nav a {
			font-size: 0.68rem;
			letter-spacing: 0.08em;
		}
	}
</style>
