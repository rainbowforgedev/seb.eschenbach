import { works, exhibitions } from '$lib/content';

const DOMAIN = 'https://sebastian-RF.de';

const staticPages = ['/', '/gallery', '/exhibitions', '/about', '/contact'];

export async function GET() {
	const workUrls = works.map((w) => `/gallery/${w.slug}`);
	const ausstellungUrls = exhibitions.map((a) => `/exhibitions/${a.slug}`);

	const allUrls = [...staticPages, ...workUrls, ...ausstellungUrls];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
	.map(
		(path) => `  <url>
    <loc>${DOMAIN}${path}</loc>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
