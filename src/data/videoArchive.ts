export const youtubeChannelUrl = 'https://www.youtube.com/@M1RA_Archive_Project';
export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export interface ArchiveVideo {
	id: string;
	title: string;
	label: string;
	description: string;
	thumbnail?: 'hqdefault' | 'maxresdefault';
	detailHref?: string;
}

// 掲載順は選定順。ハミちゃん本編・紹介は専用サイトで案内する。
export const videoArchive: ArchiveVideo[] = [
	{
		id: 'DB1ZeTc02DM',
		thumbnail: 'maxresdefault',
		title: 'ライジングサン！',
		label: 'MUSIC VIDEO',
		description: 'AIニケちゃんDiscord一周年記念のミュージックビデオ。',
	},
	{
		id: 'jhVYUWwRZP0',
		thumbnail: 'maxresdefault',
		title: '碧落のトマホーク 第一話「碧落」',
		label: 'ANIMATION / 再編集版',
		description: '「碧落のトマホーク」第一話の再編集版。',
	},
	{
		id: 'SEdscyorM9A',
		thumbnail: 'maxresdefault',
		title: 'GHOSTS -Little Echo- 二枚の皿',
		label: 'ANIMATION / GHOSTS',
		description: 'GHOSTSの短編アニメ「Little Echo」より、二枚の皿。',
	},
	{
		id: '23q6a-mp9uQ',
		thumbnail: 'maxresdefault',
		title: 'Poison girl',
		label: 'MUSIC VIDEO',
		description: '大鹿ニク「Poison girl」のミュージックビデオ。',
	},
	{
		id: '6WqO4LywQ2U',
		thumbnail: 'maxresdefault',
		title: 'GHOSTS -Noise in the Silence- EP1',
		label: 'ANIMATION / GHOSTS',
		description: '「GHOSTS -Noise in the Silence-」の第1話。',
	},
	{
		id: '19XJHhlEPQs',
		title: 'AI Music Video 2025年上半期クロスフェード',
		label: 'MUSIC / CROSSFADE',
		description: '2025年上半期に公開したAI Music Videoのクロスフェード映像。',
		detailHref: '/work/sample-mv-01/',
	},
	{
		id: 'ufYzgDmrw4I',
		title: '架空のＡＩアニメ「ポルテポルカドット」',
		label: 'ANIMATION',
		description: '生成AIで制作した架空のアニメ作品。',
		detailHref: '/work/sample-short-01/',
	},
];
