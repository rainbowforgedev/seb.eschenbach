import { werke } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const index = werke.findIndex((w) => w.slug === params.slug);
	if (index === -1) throw error(404, 'Werk nicht gefunden');
	return {
		werk: werke[index],
		prev: werke[index - 1] ?? null,
		next: werke[index + 1] ?? null
	};
};
