import { works } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const index = works.findIndex((w) => w.slug === params.slug);
	if (index === -1) throw error(404, 'work nicht gefunden');
	return {
		work: works[index],
		prev: works[index - 1] ?? null,
		next: works[index + 1] ?? null
	};
};
