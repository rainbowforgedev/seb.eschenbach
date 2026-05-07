<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import PageHeader from '$lib/PageHeader.svelte';
	import signature from '$lib/assets/images/landschaft.jpg';

	let { form } = $props();

	let email = $state('');
	let message = $state('');
	let sending = $state(false);
	let stamped = $state(false);
	let flying = $state(false);
	let done = $state(false);

	const enhanceSubmit: SubmitFunction = () => {
		sending = true;
		// 1) cancellation stamp slams down
		stamped = true;
		// 2) postcard flies away
		setTimeout(() => (flying = true), 650);

		return async ({ result, update }) => {
			// wait for fly-away animation before swapping in result
			await new Promise((r) => setTimeout(r, 1100));
			if (result.type === 'success') {
				done = true;
			}
			await update({ reset: false });
			sending = false;
		};
	};

	function reset() {
		email = '';
		message = '';
		stamped = false;
		flying = false;
		done = false;
	}
</script>

<svelte:head>
	<title>Kontakt — Sebastian Eschenbach</title>
	<meta name="description" content="Kontakt zum Maler Sebastian Eschenbach" />
</svelte:head>

<PageHeader />

<main>
	<section class="info">
		<p class="section-label">KONTAKT</p>
		<dl class="contact-list">
			<div class="row">
				<dt>Name</dt>
				<dd>Sebastian Eschenbach</dd>
			</div>
			<div class="row">
				<dt>E-Mail</dt>
				<dd><a href="mailto:seb.eschenbach@arcor.de">seb.eschenbach@arcor.de</a></dd>
			</div>
			<div class="row">
				<dt>Telefon</dt>
				<dd><a href="tel:+490000000000">+49 000 0000000</a></dd>
			</div>
		</dl>
		<p class="hint">
			Oder schreiben Sie mir eine Postkarte — füllen Sie sie aus, und sie kommt direkt in mein
			Postfach.
		</p>
	</section>

	<section class="card-stage" class:flying class:done>
		{#if done}
			<div class="thanks" role="status">
				<p class="thanks-stamp">ZUGESTELLT</p>
				<h2>Danke!</h2>
				<p>Ihre Postkarte ist unterwegs. Ich melde mich bald.</p>
				<button type="button" class="reset-btn" onclick={reset}>Neue Postkarte schreiben</button>
			</div>
		{:else}
			<form
				id="postcard-form"
				method="POST"
				use:enhance={enhanceSubmit}
				class="postcard"
				class:sending
				class:stamped
				aria-label="Kontakt-Postkarte"
			>
				<!-- Stamp -->
				<div class="stamp" aria-hidden="true">
					<img src={signature} alt="" class="stamp-art" />
					<span class="stamp-value">A</span>
					<!-- Cancellation postmark -->
					<div class="postmark" class:on={stamped}>
						<span class="pm-line">DEUTSCHE POST</span>
						<span class="pm-circle">
							<span class="pm-date">07·05·26</span>
						</span>
						<span class="pm-waves" aria-hidden="true">
							<span></span><span></span><span></span><span></span>
						</span>
					</div>
				</div>

				<!-- Vertical separator (like real postcard) -->
				<div class="divider" aria-hidden="true"></div>

				<!-- Left: writing area -->
				<div class="writing">
					<label class="from-line">
						<span class="from-label">Von</span>
						<input
							type="email"
							name="email"
							required
							placeholder="ihre@email.de"
							autocomplete="email"
							bind:value={email}
							disabled={sending}
						/>
					</label>
					<textarea
						name="message"
						required
						placeholder="Liebe Herr Eschenbach,&#10;ich möchte Ihnen schreiben weil…"
						bind:value={message}
						disabled={sending}
						rows="7"
					></textarea>
				</div>

				<!-- Right: address area -->
				<div class="address">
					<div class="addr-label">An</div>
					<div class="addr-lines">
						<div class="addr-line">Sebastian Eschenbach</div>
						<div class="addr-line">Atelier in der Uckermark</div>
						<div class="addr-line">Auf den weißen Bergen</div>
						<div class="addr-line">Deutschland</div>
					</div>
				</div>

				<!-- Hidden honeypot -->
				<input type="text" name="website" tabindex="-1" autocomplete="off" class="honeypot" />
			</form>

			<button type="submit" form="postcard-form" class="send" disabled={sending}>
				{sending ? 'WIRD GESTEMPELT…' : 'ABSCHICKEN'}
			</button>

			{#if form?.error}
				<p class="error" role="alert">{form.error}</p>
			{/if}
		{/if}
	</section>
</main>

<style>
	main {
		max-width: clamp(1100px, 88vw, 1800px);
		margin: 0 auto;
		padding: 3rem 2rem 6rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	.section-label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.2em;
		color: #888;
		margin-bottom: 1.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	.contact-list {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.row {
		display: grid;
		grid-template-columns: 90px 1fr;
		align-items: baseline;
		gap: 1rem;
	}

	dt {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		color: #888;
		text-transform: uppercase;
	}

	dd {
		font-family: var(--font-serif);
		font-size: 1.05rem;
		color: var(--color-ink);
	}

	dd a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.hint {
		margin-top: 2rem;
		font-family: var(--font-serif);
		font-style: italic;
		color: #555;
		line-height: 1.7;
		max-width: 28em;
	}

	/* ── Postcard ───────────────────────────────────────── */
	.card-stage {
		perspective: 1400px;
		min-height: 460px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 0;
	}

	.postcard {
		position: relative;
		width: 100%;
		max-width: 640px;
		aspect-ratio: 3 / 2;
		background: #f5f1ea;
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.08),
			0 14px 36px rgba(0, 0, 0, 0.18);
		display: grid;
		grid-template-columns: 1fr 1px 1fr;
		grid-template-rows: 1fr auto;
		gap: 0;
		padding: 1.4rem 1.4rem 4.5rem;
		transition:
			transform 0.95s cubic-bezier(0.55, 0.05, 0.6, 1),
			opacity 0.95s ease;
		transform-origin: 50% 110%;
		will-change: transform, opacity;
	}

	.postcard.sending {
		pointer-events: none;
	}

	.card-stage.flying .postcard {
		transform: translate(60vw, -110vh) rotate(28deg) scale(0.55);
		opacity: 0;
	}

	/* ── Stamp ── */
	.stamp {
		position: absolute;
		top: 1.1rem;
		right: 1.1rem;
		width: 78px;
		height: 96px;
		background: #efe7d6;
		border: 1px solid #b3a98e;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
		z-index: 2;
		--perf-edge: radial-gradient(circle, #f5f1ea 1.6px, transparent 1.8px);
		background-image: var(--perf-edge), var(--perf-edge), var(--perf-edge), var(--perf-edge);
		background-size: 8px 8px;
		background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
		background-position:
			0 -4px,
			0 calc(100% + 4px),
			-4px 0,
			calc(100% + 4px) 0;
	}

	.stamp-art {
		width: 70%;
		height: 70%;
		object-fit: cover;
		object-position: center;
		opacity: 0.75;
		filter: sepia(0.2) contrast(0.95);
	}

	.stamp-value {
		position: absolute;
		bottom: 4px;
		right: 6px;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.06em;
		color: #5b4f33;
	}

	/* ── Postmark / cancellation ── */
	.postmark {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		color: #5a1a1a;
		opacity: 0;
		transform: rotate(-14deg) scale(1.45);
		transition:
			opacity 0.18s ease-out,
			transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
		pointer-events: none;
	}

	.postmark.on {
		opacity: 0.78;
		transform: rotate(-14deg) scale(1);
	}

	.pm-line {
		font-family: var(--font-mono);
		font-size: 0.46rem;
		letter-spacing: 0.12em;
		font-weight: 500;
	}

	.pm-circle {
		width: 44px;
		height: 44px;
		border: 1.5px solid currentColor;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pm-date {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		letter-spacing: 0.04em;
	}

	.pm-waves {
		position: absolute;
		left: -32px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.pm-waves span {
		display: block;
		width: 28px;
		height: 1.5px;
		background: currentColor;
		border-radius: 2px;
	}

	/* ── Divider ── */
	.divider {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
		background: var(--color-border);
		margin: 0.5rem 0;
	}

	/* ── Writing ── */
	.writing {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
		padding-right: 1rem;
	}

	.from-line {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 0.35rem;
	}

	.from-label {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.18em;
		color: #888;
	}

	.from-line input {
		flex: 1;
		min-width: 0;
		border: none;
		outline: none;
		background: transparent;
		font-family: var(--font-hand);
		font-size: 1.25rem;
		color: #1d2a4a;
		padding: 0;
	}

	.from-line input::placeholder {
		font-family: var(--font-serif);
		font-size: 0.95rem;
		font-style: italic;
		color: #b5ae9e;
	}

	.writing textarea {
		flex: 1;
		border: none;
		outline: none;
		resize: none;
		background: repeating-linear-gradient(
			to bottom,
			transparent 0,
			transparent 1.7rem,
			rgba(0, 0, 0, 0.06) 1.7rem,
			rgba(0, 0, 0, 0.06) calc(1.7rem + 1px)
		);
		font-family: var(--font-hand);
		font-size: 1.35rem;
		line-height: 1.7rem;
		color: #1d2a4a;
		padding: 0;
		min-height: 0;
	}

	.writing textarea::placeholder {
		font-family: var(--font-serif);
		font-size: 0.95rem;
		font-style: italic;
		color: #b5ae9e;
		line-height: 1.7rem;
	}

	/* ── Address ── */
	.address {
		grid-column: 3 / 4;
		grid-row: 1 / 2;
		padding-left: 1rem;
		padding-top: 4.2rem; /* leave space below stamp */
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.addr-label {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		letter-spacing: 0.18em;
		color: #888;
		margin-bottom: 0.3rem;
	}

	.addr-lines {
		display: flex;
		flex-direction: column;
	}

	.addr-line {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		color: #333;
		padding: 0.45rem 0.15rem;
		border-bottom: 1px solid var(--color-border);
	}

	/* ── Send button ── */
	.send {
		margin-top: 2rem;
		padding: 0.65rem 1.6rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.22em;
		background: var(--color-ink);
		color: var(--color-bg);
		border: none;
		cursor: pointer;
		transition:
			background 0.15s,
			opacity 0.2s;
	}

	.send:hover:not(:disabled) {
		background: var(--color-accent);
	}

	.send:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	/* ── Thanks state ── */
	.thanks {
		text-align: center;
		padding: 4rem 2rem;
		animation: thanksIn 0.6s 0.1s backwards ease-out;
	}

	@keyframes thanksIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.thanks-stamp {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.3em;
		color: #5a1a1a;
		border: 1.5px solid #5a1a1a;
		padding: 0.4rem 0.9rem;
		transform: rotate(-6deg);
		opacity: 0.85;
		margin-bottom: 1.5rem;
	}

	.thanks h2 {
		font-family: var(--font-serif);
		font-size: 2.4rem;
		font-style: italic;
		margin-bottom: 0.6rem;
	}

	.thanks p {
		font-family: var(--font-serif);
		color: #555;
		line-height: 1.7;
	}

	.reset-btn {
		margin-top: 2rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		background: transparent;
		border: 1px solid var(--color-ink);
		padding: 0.55rem 1.2rem;
		cursor: pointer;
		color: var(--color-ink);
		transition: background 0.15s;
	}

	.reset-btn:hover {
		background: var(--color-ink);
		color: var(--color-bg);
	}

	.error {
		margin-top: 1rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: #a13b3b;
		text-align: center;
	}

	/* ── Layout ── */
	@media (min-width: 880px) {
		main {
			grid-template-columns: 280px 1fr;
			gap: 4rem;
			padding: 3rem 3rem 6rem;
			align-items: start;
		}

		.info {
			position: sticky;
			top: 5rem;
		}

		.postcard {
			max-width: 100%;
			max-height: 72vh;
		}
	}

	@media (max-width: 600px) {
		.postcard {
			aspect-ratio: auto;
			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto;
			padding: 1.2rem 1.2rem 4rem;
		}

		.stamp {
			width: 64px;
			height: 80px;
			top: 1rem;
			right: 1rem;
		}

		.divider {
			display: none;
		}

		.writing {
			grid-column: 1;
			grid-row: 2;
			padding-right: 0;
			margin-top: 5.5rem;
		}

		.address {
			grid-column: 1;
			grid-row: 1;
			padding-left: 0;
			padding-top: 0;
			padding-right: 90px; /* clear stamp */
		}

		.writing textarea {
			min-height: 180px;
		}
	}
</style>
