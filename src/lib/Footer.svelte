<footer>
	<span>© {new Date().getFullYear()} Sebastian Eschenbach</span>
	<nav>
		<a href="/impressum">Impressum</a>
		<a href="/privacy-policy">privacy-policy</a>
	</nav>
</footer>

<style>
	footer {
		border-top: 1px solid var(--color-border);
		padding: 1.2rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	footer,
	footer a {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		color: #999;
	}

	nav {
		display: flex;
		gap: 1.5rem;
	}

	footer a:hover {
		color: var(--color-ink);
	}

	@media (max-width: 480px) {
		footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.6rem;
			padding: 1rem 1.25rem;
		}
	}
</style>
