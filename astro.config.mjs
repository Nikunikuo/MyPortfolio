// @ts-check
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const _root = dirname(fileURLToPath(import.meta.url));

/**
 * ファイル内容に基づく短いハッシュ。ビルドのたびに中身が変われば i18n / 画像の URL が変わり、
 * ブラウザ・CDN キャッシュで古い表示が残るのを防ぐ。
 */
function shortFileHash(relativePath) {
	const p = join(_root, relativePath);
	if (!existsSync(p)) {
		return '0';
	}
	return createHash('md5').update(readFileSync(p)).digest('hex').slice(0, 8);
}

const I18N_HASH = shortFileHash('public/scripts/i18n.js');
const LATEST_WORKS_ICON_HASH = shortFileHash('public/images/Lastest.png');

// https://astro.build/config
export default defineConfig({
	site: 'https://niku.studio',
	integrations: [sitemap()],
	vite: {
		define: {
			'import.meta.env.PUBLIC_I18N_HASH': JSON.stringify(I18N_HASH),
			'import.meta.env.PUBLIC_LATEST_WORKS_ICON_HASH': JSON.stringify(
				LATEST_WORKS_ICON_HASH
			),
		},
	},
});
