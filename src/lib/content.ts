function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return { data: {}, content: raw.trim() };
	const content = match[2].trim();
	const data: Record<string, unknown> = {};
	const lines = match[1].split('\n');
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		const colon = line.indexOf(':');
		if (colon === -1) {
			i++;
			continue;
		}
		const key = line.slice(0, colon).trim();
		const val = line.slice(colon + 1).trim();

		if (val === '') {
			const list: string[] = [];
			let j = i + 1;
			while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
				list.push(lines[j].replace(/^\s*-\s+/, '').replace(/^["']|["']$/g, ''));
				j++;
			}
			if (list.length > 0) {
				data[key] = list;
				i = j;
				continue;
			}
			data[key] = '';
			i++;
			continue;
		}

		if (val === 'true') data[key] = true;
		else if (val === 'false') data[key] = false;
		else if (/^\d+$/.test(val)) data[key] = parseInt(val, 10);
		else data[key] = val.replace(/^["']|["']$/g, '');
		i++;
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
	price?: string;
	status?: string;
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

export interface VitaPage {
	portrait: string;
	pressImage: string;
	body: string;
}

export interface KontaktPage {
	name: string;
	email: string;
	phone: string;
	address: string[];
	hint: string;
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

const pagesRaw = import.meta.glob('/src/content/pages/*.md', {
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

const GERMAN_MONTHS: Record<string, number> = {
	januar: 0,
	februar: 1,
	'mã¤rz': 2,
	märz: 2,
	maerz: 2,
	april: 3,
	mai: 4,
	juni: 5,
	juli: 6,
	august: 7,
	september: 8,
	oktober: 9,
	november: 10,
	dezember: 11
};

function parseGermanDate(s: string | undefined): number {
	if (!s) return 0;
	const m = s.match(/(\d{1,2})\.\s*([A-Za-zÄÖÜäöüß]+)\s*(\d{4})/);
	if (!m) return 0;
	const day = parseInt(m[1], 10);
	const month = GERMAN_MONTHS[m[2].toLowerCase()] ?? 0;
	const year = parseInt(m[3], 10);
	return new Date(year, month, day).getTime();
}

export const ausstellungen: Ausstellung[] = parseAll<Ausstellung>(ausstellungenRaw).sort((a, b) => {
	if (a.isCurrent && !b.isCurrent) return -1;
	if (!a.isCurrent && b.isCurrent) return 1;
	return parseGermanDate(b.dateFrom) - parseGermanDate(a.dateFrom);
});

export const vitaEntries: VitaEntry[] = parseAll<VitaEntry>(vitaRaw);

function loadPage<T>(slug: string): T {
	const raw = (pagesRaw[`/src/content/pages/${slug}.md`] ?? '') as string;
	const { data, content: body } = parseFrontmatter(raw);
	return { ...data, body } as T;
}

export const vitaPage: VitaPage = loadPage<VitaPage>('vita');
export const kontaktPage: KontaktPage = loadPage<KontaktPage>('kontakt');
