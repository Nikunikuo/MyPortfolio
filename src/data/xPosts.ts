// X（@M1RA_A_Project）の投稿。表示は古い順（上が最も古い）。

export interface XPost {
	title: string;
	/** 表示用（JST 基準、投稿IDから推定） */
	publishedDate: string;
	/** <time datetime> 用 */
	publishedAtIso: string;
	url: string;
}

export const xPosts: XPost[] = [
	{
		title: '新画像生成AI「Uni-1」～自己回帰モデルとは～',
		publishedDate: '2026/3/22',
		publishedAtIso: '2026-03-22',
		url: 'https://x.com/M1RA_A_Project/status/2035384730246647824',
	},
	{
		title: '俺の倫理　～生成AI創作における個人的線引き～',
		publishedDate: '2026/4/4',
		publishedAtIso: '2026-04-04',
		url: 'https://x.com/M1RA_A_Project/status/2040400484989813069',
	},
	{
		title: '滾るぜ！Renoise×AIAgent×Remotion',
		publishedDate: '2026/4/6',
		publishedAtIso: '2026-04-06',
		url: 'https://x.com/M1RA_A_Project/status/2040934500688138540',
	},
	{
		title: 'コスパ最強はどれ？AI動画生成サービス比較表（Seedance2.0編）',
		publishedDate: '2026/4/6',
		publishedAtIso: '2026-04-06',
		url: 'https://x.com/M1RA_A_Project/status/2041056838364623025',
	},
	{
		title:
			'「20分AIアニメ作ったら700時間と10万溶けた件」～AI簡単って誰が言った？～',
		publishedDate: '2026/4/11',
		publishedAtIso: '2026-04-11',
		url: 'https://x.com/M1RA_A_Project/status/2042819195889762801',
	},
	{
		title: 'オイオイ！Comfy簡単じゃん！',
		publishedDate: '2026/4/18',
		publishedAtIso: '2026-04-18',
		url: 'https://x.com/M1RA_A_Project/status/2045339452206444929',
	},
	{
		title: '僕がシリーズ物をたくさん出す理由',
		publishedDate: '2026/4/26',
		publishedAtIso: '2026-04-26',
		url: 'https://x.com/M1RA_A_Project/status/2048208029955539409',
	},
];
