<script lang="ts">
	import type { Ausstellung } from '$lib/content';

	let {
		ausstellung,
		featured = false
	}: { ausstellung: Ausstellung; featured?: boolean } = $props();

	let flipped = $state(false);
	let isPortrait = $derived(ausstellung.orientation !== 'landscape');
</script>

<div
	class="scene"
	class:portrait={isPortrait}
	class:landscape={!isPortrait}
	class:featured
	role="button"
	tabindex="0"
	onclick={() => (flipped = !flipped)}
	onkeydown={(e) => e.key === 'Enter' && (flipped = !flipped)}
	aria-label={flipped ? 'Karte zurückwenden' : 'Karte wenden'}
	aria-pressed={flipped}
>
	<div class="card" class:is-flipped={flipped}>
		<!-- Front: exhibition photo -->
		<div class="face front">
			<img src={ausstellung.image} alt={ausstellung.title} loading="lazy" />
			<span class="flip-hint">↺</span>
		</div>

		<!-- Back: image OR preset layout -->
		<div class="face back">
			{#if ausstellung.backImage}
				<img class="back-image" src={ausstellung.backImage} alt="{ausstellung.title} – Rückseite" />
			{:else if isPortrait}
				<!-- Portrait preset: stamp top-right, message middle, address bottom -->
				<div class="back-portrait">
					<div class="stamp-row">
						<div class="stamp-box"></div>
					</div>
					<div class="message">
						<h3>{ausstellung.title}</h3>
						<p>{ausstellung.body}</p>
					</div>
					<div class="address">
						<div class="addr-line">{ausstellung.dateFrom} – {ausstellung.dateTo}</div>
						<div class="addr-line">{ausstellung.location}</div>
					</div>
				</div>
			{:else}
				<!-- Landscape preset: message left, divider, stamp+address right -->
				<div class="back-landscape">
					<div class="message">
						<h3>{ausstellung.title}</h3>
						<p>{ausstellung.body}</p>
					</div>
					<div class="separator"></div>
					<div class="address-area">
						<div class="stamp-box"></div>
						<div class="address">
							<div class="addr-line">{ausstellung.dateFrom} – {ausstellung.dateTo}</div>
							<div class="addr-line">{ausstellung.location}</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.scene {
		perspective: 1200px;
		cursor: pointer;
		width: 100%;
		outline: none;
		position: relative;
		height: 0; /* height comes entirely from padding-bottom */
	}

	/* padding-bottom % is relative to WIDTH, so this locks the aspect ratio */
	.scene.portrait {
		padding-bottom: 150%; /* 2:3 card — height = 1.5× width */
	}

	.scene.landscape {
		padding-bottom: 66.67%; /* 3:2 card — height = 0.667× width */
	}

	.scene:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
	}

	.card {
		position: absolute;
		inset: 0;
		transform-style: preserve-3d;
		transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card.is-flipped {
		transform: rotateY(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	/* ── Front ── */
	.front {
		background: #f0ece5;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.14);
		overflow: hidden;
	}

	.front img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	.flip-hint {
		position: absolute;
		bottom: 0.6rem;
		right: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.12em;
		color: rgba(0, 0, 0, 0.35);
		pointer-events: none;
		user-select: none;
	}

	/* ── Back: shared base ── */
	.back {
		transform: rotateY(180deg);
		background-color: #f5f1ea;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.14);
		overflow: hidden;
	}

	/* Optional: real back-of-postcard photo */
	.back-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Shared stamp box */
	.stamp-box {
		width: 48px;
		height: 62px;
		border: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	/* Shared message typography */
	.message h3 {
		font-family: var(--font-serif);
		font-size: 1rem;
		font-style: italic;
		color: var(--color-ink);
		line-height: 1.3;
	}

	.message p {
		font-family: var(--font-serif);
		font-size: 0.82rem;
		line-height: 1.7;
		color: #333;
		margin-top: 0.5rem;
	}

	/* Shared address line typography */
	.addr-line {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.04em;
		color: #333;
		padding: 0.55rem 0.25rem 0.4rem;
		border-bottom: 1px solid var(--color-border);
	}

	/* ── Back: Portrait preset ── */
	.back-portrait {
		height: 100%;
		padding: 1.1rem 1.1rem 1.1rem 1.1rem;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 1rem;
	}

	.back-portrait .stamp-row {
		display: flex;
		justify-content: flex-end;
	}

	.back-portrait .message {
		min-height: 0;
		overflow: hidden;
	}

	.back-portrait .address {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--color-border);
	}

	/* ── Back: Landscape preset ── */
	.back-landscape {
		height: 100%;
		padding: 1.1rem;
		display: grid;
		grid-template-columns: 1fr 1px 1fr;
		gap: 1rem;
		align-items: stretch;
	}

	.back-landscape .message {
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.back-landscape .separator {
		background: var(--color-border);
	}

	.back-landscape .address-area {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-width: 0;
	}

	.back-landscape .address-area .stamp-box {
		align-self: flex-end;
	}

	.back-landscape .address {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--color-border);
	}
</style>
