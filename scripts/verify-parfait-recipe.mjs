import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const slug = 'favorite-parfait-party';
const route = `/hami-preview/recipes/${slug}/`;
const html = readFileSync(`dist${route}index.html`, 'utf8');
const recipeData = JSON.parse(readFileSync('src/data/hami-parfait-recipe.json', 'utf8'));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate page IDs');
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const anchor of anchors) assert.ok(ids.includes(anchor), `Missing anchor: ${anchor}`);

const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
for (const image of images) {
	assert.match(image, /\bwidth="\d+"/);
	assert.match(image, /\bheight="\d+"/);
	const source = image.match(/src="([^"]+)"/)[1];
	assert.ok(existsSync(`public${source}`), `Missing image: ${source}`);
	await sharp(`public${source}`).stats();
}
const structuredData = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => JSON.parse(match[1]));
const recipe = structuredData.find((entry) => entry['@type'] === 'Recipe');
assert.equal(recipe.recipeInstructions.length, 8);
assert.equal(recipe.recipeIngredient.length, 19);
assert.equal(recipe.video?.embedUrl, 'https://www.youtube-nocookie.com/embed/0-LZ7_sGK38');
assert.match(html, /src="https:\/\/www\.youtube-nocookie\.com\/embed\/0-LZ7_sGK38\?rel=0"/);
assert.ok(!html.includes('YouTube公開前'), 'Do not assert an unconfirmed release state');
assert.ok(!html.includes('第15話'), 'Do not invent an episode number');
assert.ok(html.includes('本編カットではありません'));
assert.ok(html.includes('実調理テストは未実施'));
assert.ok(recipeData.steps[4].body.includes('苺のスライス'));
for (const entry of ['dist/hami-preview/index.html', 'dist/hami-preview/recipes/index.html', 'dist/hami-preview/recipes/nostalgic-rendang/index.html']) {
	assert.ok(readFileSync(entry, 'utf8').includes(route), `Missing incoming link: ${entry}`);
}
const topHtml = readFileSync('dist/hami-preview/index.html', 'utf8');
assert.match(topHtml, /class="inline-player" data-video-id="0-LZ7_sGK38"/);
assert.ok(topHtml.includes('https://www.youtube.com/watch?v=0-LZ7_sGK38'));
assert.ok(topHtml.includes('https://www.youtube.com/watch?v=vyYJYYfK98A'), 'Preserve the rendang episode');
const metadata = JSON.parse(readFileSync('src/data/hami-image-metadata.json', 'utf8'));
const originalMetadata = JSON.parse(execFileSync('git', ['show', 'HEAD:src/data/hami-image-metadata.json'], { encoding: 'utf8' }));
for (const [path, original] of Object.entries(originalMetadata)) assert.deepEqual(metadata[path], original, `Changed old image metadata: ${path}`);
assert.equal(readFileSync('src/data/hami-recipes.json', 'utf8').replace(/\r\n/g, '\n'), execFileSync('git', ['show', 'HEAD:src/data/hami-recipes.json'], { encoding: 'utf8' }).replace(/\r\n/g, '\n'), 'Existing recipe content changed');

if (process.argv[2]) {
	const subtitles = readFileSync(process.argv[2], 'utf8');
	const quotations = [...recipeData.comments.map((comment) => comment.text), ...recipeData.steps.flatMap((step) => step.quote ? [step.quote] : []), recipeData.endingQuote];
	for (const quote of quotations) assert.ok(subtitles.includes(quote), `Quote not found in final subtitles: ${quote}`);
}
console.log(JSON.stringify({ result: 'PASS', imagesDecoded: images.length, anchors: anchors.length, steps: recipe.recipeInstructions.length, ingredients: recipe.recipeIngredient.length, entryLinks: 3, oldImageEntriesUnchanged: Object.keys(originalMetadata).length, existingRecipeContentUnchanged: true }, null, 2));
