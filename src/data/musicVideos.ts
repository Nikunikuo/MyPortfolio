// ミュージックビデオ作品データ（新しい順）
export const musicVideos = [
	{
		slug: '01',
		title: '君は人間ですか',
		youtubeId: '818FAfWCp18',
		intro: 'AIと人間の境界を問う、哲学的なミュージックビデオ。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-kimi-wa-ningen', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
		isNew: true,
	},
	{
		slug: '02',
		title: 'Your Life is Yours',
		youtubeId: 'j7ab6JBxoFc',
		intro: 'あなたの人生はあなた自身のもの。前に進む勇気を歌った作品。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-your-life', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '03',
		title: 'AI☆NIKE PUNK!',
		youtubeId: 'ywRXhxSJdMw',
		intro: 'パンクロックで突き進む、AIの反骨精神を表現。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-ai-nike-punk', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '04',
		title: 'Unbreakable',
		youtubeId: 'XCN4nPhHr9E',
		intro: '決して折れない心を描いた、エモーショナルな楽曲。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-unbreakable', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '05',
		title: '無敵の船長',
		youtubeId: 'Cj-lY7xvow0',
		intro: '航海に出る船長の冒険心を歌ったミュージックビデオ。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-muteki-no-senchou', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '06',
		title: '街角の亡霊',
		youtubeId: '9nNO0_YVM0k',
		intro: '都会の片隅に佇む、記憶の残像を描いた作品。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-machikado-no-bourei', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '07',
		title: 'NEOSPHERE PARADE',
		youtubeId: 'cqAXSlSeUTI',
		intro: '新しい世界のパレード。未来への期待感を表現。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-neosphere-parade', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '08',
		title: 'ヴァルカンとパラス',
		youtubeId: 'ZhJS_KGtdo4',
		intro: '神話に登場する二柱の神を題材にした幻想的な作品。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-vulcan-pallas', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '09',
		title: 'リブート.',
		youtubeId: 'fY9wQ_4xpZA',
		intro: '再起動。新しい自分に生まれ変わる瞬間を描く。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-reboot', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
	{
		slug: '10',
		title: '名前の無い木',
		youtubeId: 'r-4K6_aHMYc',
		intro: '名もなき存在の静かな物語。初期作品。',
		noteUrl: 'https://note.com/m1ra_project/n/xxx-namae-no-nai-ki', // ← 後で実際のURLに差し替え
		description: '',
		releaseDate: '',
	},
];

// TypeScript型定義
export interface MusicVideo {
	slug: string;
	title: string;
	youtubeId: string;
	intro: string;
	noteUrl: string;
	description: string;
	releaseDate: string;
	isNew?: boolean;
}
