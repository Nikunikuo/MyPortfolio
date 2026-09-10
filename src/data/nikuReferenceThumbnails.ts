interface ReferenceThumbnail {
	url: string;
	width: number;
	height: number;
	/** 元作品のURL。動画そのものは公開フォルダに置かない。 */
	sourcePostUrl: string;
	/** 動画から選んだフレームの時刻。作品への加筆・生成はしない。 */
	timestampSeconds: number;
}

/**
 * 一覧専用の表紙。元投稿の media は保存したまま、表示画像だけ差し替える。
 * ここにない作品、またはローカル画像が読めない場合は元のXプレビューを使う。
 * 追加画像として数えないため、投稿の「全N点」表示は変わらない。
 */
export const nikuReferenceThumbnails: Record<string, ReferenceThumbnail> = {
	'2097691198165340234': {
		url: '/images/Niku/works/2097691198165340234-scene-v1.webp',
		width: 960,
		height: 540,
		sourcePostUrl: 'https://x.com/_3912657840/status/2097691198165340234',
		timestampSeconds: 5.82,
	},
	'2097672344395501972': {
		url: '/images/Niku/works/2097672344395501972-scene-v1.webp',
		width: 720,
		height: 960,
		sourcePostUrl: 'https://x.com/lilyAIstudy/status/2097672344395501972',
		timestampSeconds: 6.03,
	},
	'2097365684003250314': {
		url: '/images/Niku/works/2097365684003250314-scene-v1.webp',
		width: 960,
		height: 540,
		sourcePostUrl: 'https://x.com/manaimovie/status/2097365684003250314',
		timestampSeconds: 7.29,
	},
	'2097636674004295807': {
		url: '/images/Niku/works/2097636674004295807-scene-v1.webp',
		width: 960,
		height: 540,
		sourcePostUrl: 'https://x.com/gatuwo_jp/status/2097636674004295807',
		timestampSeconds: 12.97,
	},
};
