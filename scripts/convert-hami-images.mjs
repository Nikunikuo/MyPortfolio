import { readdir, stat, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import sharp from 'sharp';

const root = resolve('public/images/hami');
const manifestPath = resolve('src/data/hami-image-metadata.json');
const sourceExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const avifOptions = { quality: 60, effort: 4 };

async function collectFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map((entry) => {
			const path = join(directory, entry.name);
			return entry.isDirectory() ? collectFiles(path) : [path];
		})
	);
	return nested.flat();
}

const sources = (await collectFiles(root))
	.filter((path) => sourceExtensions.has(extname(path).toLowerCase()))
	.sort((a, b) => a.localeCompare(b, 'en'));

const destinationOwners = new Map();
for (const source of sources) {
	const destination = source.slice(0, -extname(source).length) + '.avif';
	const previous = destinationOwners.get(destination);
	if (previous) {
		throw new Error(`AVIF filename collision: ${previous} and ${source}`);
	}
	destinationOwners.set(destination, source);
}

const manifest = {};
let sourceBytes = 0;
let avifBytes = 0;

for (const [index, source] of sources.entries()) {
	const extension = extname(source);
	const destination = source.slice(0, -extension.length) + '.avif';
	const input = sharp(source, { failOn: 'error' }).rotate();
	const sourceStats = await stat(source);
	const { data, info } = await input
		.avif(avifOptions)
		.toBuffer({ resolveWithObject: true });

	await writeFile(destination, data);
	sourceBytes += sourceStats.size;
	avifBytes += info.size;

	const publicPath = `/images/hami/${relative(root, destination).split(sep).join('/')}`;
	manifest[publicPath] = {
		width: info.width,
		height: info.height,
		bytes: info.size,
		hasAlpha: info.channels === 4,
	};

	process.stdout.write(`\rConverted ${String(index + 1).padStart(3, ' ')}/${sources.length}`);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const reduction = sourceBytes > 0 ? (1 - avifBytes / sourceBytes) * 100 : 0;
console.log(
	`\nAVIF complete: ${sources.length} files, quality=${avifOptions.quality}, effort=${avifOptions.effort}`
);
console.log(
	`Size: ${(sourceBytes / 1024 / 1024).toFixed(2)} MiB -> ${(avifBytes / 1024 / 1024).toFixed(2)} MiB (${reduction.toFixed(1)}% smaller)`
);
console.log(`Metadata: ${manifestPath}`);
