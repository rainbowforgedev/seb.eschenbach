#!/usr/bin/env node
// Converts all JPG/JPEG/PNG images in static/ and static/uploads/ to WebP,
// then updates all markdown content files to reference the new paths.
// Run once manually: node scripts/optimize-images.js

import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const STATIC = path.join(ROOT, 'static');
const UPLOADS = path.join(ROOT, 'static/uploads');
const CONTENT = path.join(ROOT, 'src/content');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);
const MAX_WIDTH = 1600;
const QUALITY = 69;

async function findImages(dir, shallow = true) {
	const entries = await readdir(dir, { withFileTypes: true });
	const images = [];
	for (const e of entries) {
		if (e.isFile() && IMAGE_EXTS.has(path.extname(e.name))) {
			images.push(path.join(dir, e.name));
		} else if (!shallow && e.isDirectory()) {
			images.push(...(await findImages(path.join(dir, e.name), false)));
		}
	}
	return images;
}

async function convertToWebP(src) {
	const ext = path.extname(src);
	const dest = src.slice(0, -ext.length) + '.webp';

	if (existsSync(dest)) {
		console.log(`  skip  ${path.relative(STATIC, src)} (webp already exists)`);
		return null;
	}

	const meta = await sharp(src).metadata();
	const resizeOpts = meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : {};

	await sharp(src).resize(resizeOpts).webp({ quality: QUALITY }).toFile(dest);

	const srcSize = (await import('fs')).statSync(src).size;
	const destSize = (await import('fs')).statSync(dest).size;
	const saving = Math.round((1 - destSize / srcSize) * 100);

	console.log(
		`  ✓  ${path.relative(STATIC, src)}  →  .webp  (${(srcSize / 1024 / 1024).toFixed(1)} MB → ${(destSize / 1024).toFixed(0)} KB, −${saving}%)`
	);

	return { old: path.relative(STATIC, src), new: path.relative(STATIC, dest) };
}

async function updateMarkdown(conversions) {
	const map = new Map(conversions.map((c) => ['/' + c.old, '/' + c.new]));

	const walk = async (dir) => {
		const entries = await readdir(dir, { withFileTypes: true });
		for (const e of entries) {
			const full = path.join(dir, e.name);
			if (e.isDirectory()) {
				await walk(full);
			} else if (e.name.endsWith('.md')) {
				let content = await readFile(full, 'utf8');
				let changed = false;
				for (const [oldPath, newPath] of map) {
					if (content.includes(oldPath)) {
						content = content.replaceAll(oldPath, newPath);
						changed = true;
					}
				}
				if (changed) {
					await writeFile(full, content, 'utf8');
					console.log(`  updated  ${path.relative(ROOT, full)}`);
				}
			}
		}
	};

	await walk(CONTENT);
}

async function main() {
	console.log('Converting images to WebP...\n');

	// Root-level static images (skip subdirs like admin/, bg_files/, fonts/, uploads/)
	const rootImages = await findImages(STATIC, true);
	// All images in uploads/
	const uploadImages = await findImages(UPLOADS, false);

	const all = [...rootImages, ...uploadImages];

	if (all.length === 0) {
		console.log('No images found.');
		return;
	}

	const conversions = [];
	for (const img of all) {
		const result = await convertToWebP(img);
		if (result) conversions.push(result);
	}

	if (conversions.length === 0) {
		console.log('\nAll images already converted, nothing to update.');
		return;
	}

	console.log('\nUpdating content files...\n');
	await updateMarkdown(conversions);

	console.log(`\nDone. ${conversions.length} image(s) converted.`);
	console.log(
		'\nOriginal files were kept. Delete them manually once you have verified the site looks correct.'
	);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
