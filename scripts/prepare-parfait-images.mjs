import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import sharp from 'sharp';

// Only the new parfait assets are encoded. Existing Hami images are never rewritten.
const [generatedDirectory, episodeArtDirectory] = process.argv.slice(2);
if (!generatedDirectory || !episodeArtDirectory) {
	throw new Error('Usage: node scripts/prepare-parfait-images.mjs <generated-directory> <episode-art-directory>');
}
const slug = 'favorite-parfait-party';
const metadataPath = resolve('src/data/hami-image-metadata.json');
const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
const entries = [
	...['strawberry-pistachio', 'mango-passion', 'raspberry-millefeuille'].map((name) => ({
		source: join(generatedDirectory, `${name}-parfait-gpt-image-2.png`),
		path: `/images/hami/recipes/generated/${slug}/${name}.avif`,
		width: 1000,
	})),
	{ source: join(episodeArtDirectory, 'A_三人と三種パフェ_王道ヒーロー_GPT-Image-2.png'), path: `/images/hami/recipes/episodes/${slug}/hero.avif`, width: 1600 },
	{ source: join(episodeArtDirectory, 'B_パフェ主役_食べる直前_GPT-Image-2.png'), path: `/images/hami/recipes/episodes/${slug}/ending.avif`, width: 1200 },
];

async function saveNewOrIdentical(destination, buffer) {
	let exists = false;
	try { await access(destination); exists = true; } catch {}
	if (exists) {
		if (!(await readFile(destination)).equals(buffer)) throw new Error(`Refusing to replace existing asset: ${destination}`);
		return;
	}
	await mkdir(resolve(destination, '..'), { recursive: true });
	await writeFile(destination, buffer, { flag: 'wx' });
}

for (const entry of entries) {
	const { data, info } = await sharp(entry.source).rotate().resize({ width: entry.width, withoutEnlargement: true }).avif({ quality: 60, effort: 4 }).toBuffer({ resolveWithObject: true });
	await saveNewOrIdentical(resolve(`public${entry.path}`), data);
	metadata[entry.path] = { width: info.width, height: info.height, bytes: info.size, hasAlpha: info.channels === 4 };
	console.log(`${entry.path} ${info.width}x${info.height} ${info.size} bytes`);
}
// The existing recipe metadata pipeline uses the hero JPEG as its sharing fallback.
const jpeg = await sharp(entries[3].source).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
await saveNewOrIdentical(resolve(`public/images/hami/recipes/episodes/${slug}/hero.jpg`), jpeg);
await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
