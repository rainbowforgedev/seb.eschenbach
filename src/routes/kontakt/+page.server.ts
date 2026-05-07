import { fail, type Actions } from '@sveltejs/kit';

const escapeHtml = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();
		const honeypot = String(data.get('website') ?? '');

		if (honeypot) return { success: true };

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Bitte eine gültige E-Mail-Adresse angeben.' });
		}
		if (!message || message.length < 5) {
			return fail(400, { error: 'Die Nachricht ist leer.' });
		}
		if (message.length > 5000) {
			return fail(400, { error: 'Die Nachricht ist zu lang.' });
		}

		const env = platform?.env as
			| { RESEND_API_KEY?: string; CONTACT_TO_EMAIL?: string; CONTACT_FROM_EMAIL?: string }
			| undefined;

		const apiKey = env?.RESEND_API_KEY;
		const toEmail = env?.CONTACT_TO_EMAIL;
		const fromEmail = env?.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

		console.log('[kontakt] apiKey:', apiKey ? '✓ set' : '✗ missing');
		console.log('[kontakt] toEmail:', toEmail ? `✓ ${toEmail}` : '✗ missing');
		console.log('[kontakt] fromEmail:', JSON.stringify(fromEmail));

		if (!apiKey || !toEmail) {
			console.error('[kontakt] Env vars missing', { apiKey, toEmail });
			return fail(500, { error: 'Versand momentan nicht möglich. Bitte später erneut versuchen.' });
		}

		const subject = `Postkarte von ${email}`;
		const html = `
			<div style="font-family: Georgia, serif; max-width: 560px;">
				<p style="font-family: monospace; font-size: 12px; color: #888; letter-spacing: 0.1em;">
					NEUE POSTKARTE
				</p>
				<p><strong>Von:</strong> ${escapeHtml(email)}</p>
				<hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
				<div style="white-space: pre-wrap; line-height: 1.7; font-size: 16px;">${escapeHtml(message)}</div>
			</div>
		`;
		const text = `Neue Postkarte\n\nVon: ${email}\n\n${message}`;

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [toEmail],
				reply_to: email,
				subject,
				html,
				text
			})
		});

		if (!res.ok) {
			const body = await res.text().catch(() => '');
			console.error('Resend error', res.status, body);
			return fail(502, { error: 'Versand fehlgeschlagen. Bitte später erneut versuchen.' });
		}

		return { success: true };
	}
};
