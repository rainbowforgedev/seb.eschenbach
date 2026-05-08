function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return { data: {}, content: raw.trim() };
	const content = match[2].trim();
	const data: Record<string, unknown> = {};
	for (const line of match[1].split('\n')) {
		const colon = line.indexOf(':');
		if (colon === -1) continue;
		const key = line.slice(0, colon).trim();
		const val = line.slice(colon + 1).trim();
		if (val === 'true') data[key] = true;
		else if (val === 'false') data[key] = false;
		else if (/^\d+$/.test(val)) data[key] = parseInt(val, 10);
		else data[key] = val.replace(/^["']|["']$/g, '');
	}
	return { data, content };
}

export interface Werk {
	slug: string;
	title: string;
	year: number;
	technique: string;
	dimensions: string;
	image: string;
	body: string;
}

export interface Ausstellung {
	slug: string;
	title: string;
	location: string;
	dateFrom: string;
	dateTo: string;
	image: string;
	body: string;
	isCurrent?: boolean;
	orientation?: 'portrait' | 'landscape';
	backImage?: string;
}

export interface VitaEntry {
	year: string;
	title: string;
	category: 'ausbildung' | 'ausstellung' | 'preis' | 'sonstiges';
	body: string;
}

const werkeRaw = import.meta.glob('/src/content/werke/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const ausstellungenRaw = import.meta.glob('/src/content/ausstellungen/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const vitaRaw = import.meta.glob('/src/content/vita/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function parseAll<T>(raw: Record<string, unknown>): T[] {
	return Object.entries(raw)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([, content]) => {
			const { data, content: body } = parseFrontmatter(content as string);
			return { ...data, body } as T;
		});
}

export const werke: Werk[] = parseAll<Werk>(werkeRaw).sort((a, b) => b.year - a.year);

export const ausstellungen: Ausstellung[] = parseAll<Ausstellung>(ausstellungenRaw).sort((a, b) => {
	if (a.isCurrent && !b.isCurrent) return -1;
	if (!a.isCurrent && b.isCurrent) return 1;
	return 0;
});

export const vitaEntries: VitaEntry[] = parseAll<VitaEntry>(vitaRaw);
