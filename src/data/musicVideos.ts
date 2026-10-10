export interface MusicVideo {
	slug: string;
	title: string;
	youtubeId: string;
	thumbnail?: 'maxresdefault';
	intro: string;
	noteUrl?: string;
	description: string;
	releaseDate: string;
	isNew?: boolean;
}

// ミュージックビデオ作品データ（新しい順）
export const musicVideos: MusicVideo[] = [
	{
		slug: '17',
		title: 'NEXT NEXT NEXT【リメイク】',
		youtubeId: 'lfG9czgCj74',
		thumbnail: 'maxresdefault',
		intro: '「NEXT NEXT NEXT」を、JIZURAを使ってリメイクしたミュージックビデオ。',
		description: '',
		releaseDate: '2026-09-24T19:43:14-07:00',
		isNew: true,
	},
	{
		slug: '16',
		title: 'ライジングサン！',
		youtubeId: 'DB1ZeTc02DM',
		thumbnail: 'maxresdefault',
		intro: 'AIニケちゃんDiscord一周年を記念して制作したミュージックビデオ。',
		description: '',
		releaseDate: '2026-09-01T05:27:35-07:00',
	},
	{
		slug: '15',
		title: 'Poison girl',
		youtubeId: '23q6a-mp9uQ',
		thumbnail: 'maxresdefault',
		intro: '大鹿ニク「Poison girl」のミュージックビデオ。',
		description: '',
		releaseDate: '2026-06-04T04:45:06-07:00',
	},
	{
		slug: '14',
		title: 'NEXT NEXT NEXT - めい feat.大鹿ニク',
		youtubeId: 'b0-jJ3GghZk',
		thumbnail: 'maxresdefault',
		intro: 'めい作曲「NEXT NEXT NEXT」のオリジナル版ミュージックビデオ。',
		description: '',
		releaseDate: '2026-05-30T17:13:33-07:00',
	},
	{
		slug: '13',
		title: 'パチンコ・スロット！ - feat.AIニケちゃん',
		youtubeId: 'yHSQKx3kfa0',
		thumbnail: 'maxresdefault',
		intro: 'AIニケちゃん、桜草メイ、M1RAが出演するミュージックビデオ。',
		description: '',
		releaseDate: '2026-04-23T17:20:16-07:00',
	},
	{
		slug: '12',
		title: '情熱ブロッサム',
		youtubeId: '397bpH3HSfQ',
		intro: '情熱が花開くように広がる、エナジーあふれる楽曲のミュージックビデオ。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '01',
		title: 'Step to "me"',
		youtubeId: 'lKCH_9_7HpM',
		intro: '自分自身へと踏み出す一歩を描いた、内省的なミュージックビデオ。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '02',
		title: '君は人間ですか',
		youtubeId: 'oNsT8Pgaj7Q',
		intro: 'AIと人間の境界を問う、哲学的なミュージックビデオ。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '03',
		title: 'Your Life is Yours',
		youtubeId: 'j7ab6JBxoFc',
		intro: 'あなたの人生はあなた自身のもの。前に進む勇気を歌った作品。',
		noteUrl: 'https://note.com/m1ra_project/n/nb4b95b19a7bc',
		description: '',
		releaseDate: '',
	},
	{
		slug: '04',
		title: 'AI☆NIKE PUNK!',
		youtubeId: 'ywRXhxSJdMw',
		intro: 'パンクロックで突き進む、AIの反骨精神を表現。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '05',
		title: 'Unbreakable',
		youtubeId: 'XCN4nPhHr9E',
		intro: '決して折れない心を描いた、エモーショナルな楽曲。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '06',
		title: '無敵の船長',
		youtubeId: 'Cj-lY7xvow0',
		intro: '航海に出る船長の冒険心を歌ったミュージックビデオ。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '07',
		title: '街角の亡霊',
		youtubeId: '9nNO0_YVM0k',
		intro: '都会の片隅に佇む、記憶の残像を描いた作品。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '08',
		title: 'NEOSPHERE PARADE',
		youtubeId: 'cqAXSlSeUTI',
		intro: '新しい世界のパレード。未来への期待感を表現。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '09',
		title: 'ヴァルカンとパラス',
		youtubeId: 'ZhJS_KGtdo4',
		intro: '神話に登場する二柱の神を題材にした幻想的な作品。',
		description: '',
		releaseDate: '',
	},
	{
		slug: '10',
		title: 'リブート.',
		youtubeId: 'fY9wQ_4xpZA',
		intro: '再起動。新しい自分に生まれ変わる瞬間を描く。',
		noteUrl: 'https://note.com/m1ra_project/n/n55a32aa346ee',
		description: '',
		releaseDate: '',
	},
	{
		slug: '11',
		title: '名前の無い木',
		youtubeId: 'r-4K6_aHMYc',
		intro: '名もなき存在の静かな物語。初期作品。',
		description: '',
		releaseDate: '',
	},
];
