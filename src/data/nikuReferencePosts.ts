import galleryMetadata from './nikuReferenceMedia.json';
import { nikuReferenceComments } from './nikuReferenceComments';
import { nikuReferenceThumbnails, nikuReferenceThumbnailIndexes } from './nikuReferenceThumbnails';

interface ReferenceMedia {
	type: 'photo' | 'video' | 'gif';
	url: string;
	width: number;
	height: number;
}

// Public metadata snapshots: media contains the post's OWN attachments, never quoted_tweet.
// Collected server-side from public syndication data, not a guaranteed/stable X API.
// Explicit video links are stored separately in linkedVideo with their source URL.
// Remote previews stay on their source CDNs. Missing entries fall back to the X link.
const gallery = galleryMetadata as Record<string, {
	authorName: string;
	authorHandle: string;
	media: ReferenceMedia[];
	linkedVideo?: ReferenceMedia & { type: 'video'; sourceUrl: string };
}>;

/**
 * 「大鹿ニクのリファレンス」で紹介する投稿。
 * 下の配列に X の投稿 URL を 1 行ずつ追加すると、ページに同じ順で並びます。
 * x.com / twitter.com の共有 URL に対応。?s=20 などの末尾はそのままで OK。
 * 配列の順が掲載順です。同じ人の別の投稿も、そのまま追加できます。
 * サムネイル・作者名は nikuReferenceMedia.json に同じ投稿IDで追加します。
 * 一言コメントは nikuReferenceComments.ts に、本人の引用リポストを元に追加します。
 * 動画途中の表紙・何枚目を表紙にするかは nikuReferenceThumbnails.ts で指定します。
 * 元のメディア配列は変更しません。
 * 動画リンクだけの投稿は、確認済みの共有カードを linkedVideo に別途登録します。
 * メタデータ未登録の投稿も、Xへのリンクとして表示されます。
 * 更新後は通常どおりビルド・公開が必要です。ブラウザ上での編集画面ではありません。
 */
export const nikuReferencePostUrls: string[] = [
	'https://x.com/_3912657840/status/2097691198165340234',
	'https://x.com/lilyAIstudy/status/2097672344395501972',
	'https://x.com/manaimovie/status/2097365684003250314',
	'https://x.com/gatuwo_jp/status/2097636674004295807',
	'https://x.com/mei_999_/status/2097618678833659930',
	'https://x.com/ABCkenji/status/2097589414226743362',
	'https://x.com/AbaneChan/status/2097531322885722206',
	'https://x.com/umimya_trbgani/status/2097526884754153889',
	'https://x.com/Samo_Toshu/status/2097521256174399829',
	'https://x.com/user_monom/status/2097516774950654046',
	'https://x.com/Akajishiya/status/2097497246929760331',
	'https://x.com/Akajishiya/status/2097496049019674896',
	'https://x.com/kaerueka220974/status/2097490287740465163',
	'https://x.com/umimya_trbgani/status/2097487014891528682',
	'https://x.com/ABCkenji/status/2097478321349210401',
	'https://x.com/nmkenji/status/2097392307138130007',
	'https://x.com/Ludi_uni/status/2097359971713524086',
	'https://x.com/0235_jp/status/2097356901038346283',
	'https://x.com/torotoromoney/status/2097600983891366083',
	'https://x.com/haruuraeadss/status/2097902010746261690',
	'https://x.com/mei_999_/status/2097909154514186481',
	'https://x.com/kukoinari/status/2097914385117421610',
	'https://x.com/tori_kizi/status/2097940196725751815',
	'https://x.com/umimya_trbgani/status/2097955520200245326',
	'https://x.com/ZetoGroovin/status/2097962333020774429',
	'https://x.com/TK2Works/status/2097972296954830993',
	'https://x.com/mei_999_/status/2097973856741065096',
	'https://x.com/0235_jp/status/2097980483225477548',
	'https://x.com/lilyAIstudy/status/2098031698936201327',
	'https://x.com/capelin_1208/status/2098065813760819366',
	'https://x.com/darche2/status/2098257213420929475',
	'https://x.com/punkuma_ai/status/2098290063562219938',
	'https://x.com/kedamasuzume/status/2098389569372860808',
	'https://x.com/lilyAIstudy/status/2098371867480621302',
	'https://x.com/0235_jp/status/2098393063597203692',
	'https://x.com/M1RA_A_Project/status/2098139370603860288',
	'https://x.com/Nokosu_kansoku/status/2098402137810378932',
	'https://x.com/minmin_4410/status/2098556099872067598',
	'https://x.com/PDyv9gdatT4132/status/2098536368951685348',
	'https://x.com/TK2Works/status/2098532285259870337',
];

export function parseReferencePost(rawUrl: string) {
	const url = new URL(rawUrl.trim());
	const allowedHosts = ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com', 'mobile.twitter.com'];
	const match = url.pathname.match(/^\/(?:([A-Za-z0-9_]{1,15})\/status|i\/(?:web\/)?status)\/([0-9]+)(?:\/(?:photo|video)\/[0-9]+)?\/?$/);
	if (!['https:', 'http:'].includes(url.protocol) || !allowedHosts.includes(url.hostname) || url.username || url.password || url.port || !match) {
		throw new Error(`リファレンスの投稿 URL を確認してください: ${rawUrl}`);
	}
	const id = match[2];
	const handle = url.pathname.startsWith('/i/') ? undefined : match[1];
	return {
		id,
		handle: handle ? `@${handle}` : undefined,
		url: `https://x.com/${handle ? `${handle}/status` : 'i/web/status'}/${id}`,
	};
}

// 同じ投稿の共有 URL が重複しても、表示するのは先に書かれた 1 件だけ。
export const nikuReferencePosts = nikuReferencePostUrls
	.map(parseReferencePost)
	.filter((post, index, posts) => posts.findIndex((item) => item.id === post.id) === index)
	.map((post) => {
		const metadata = gallery[post.id];
		// Only use a linked video's card when the post has no attachments of its own.
		const media = metadata?.media.length ? metadata.media : metadata?.linkedVideo ? [metadata.linkedVideo] : [];
		return {
			...post,
			authorName: metadata?.authorName ?? post.handle ?? '投稿者',
			authorHandle: metadata?.authorHandle ?? post.handle,
			media,
			preview: nikuReferenceThumbnails[post.id] ?? media[nikuReferenceThumbnailIndexes[post.id] ?? 0] ?? media[0],
			previewFallback: nikuReferenceThumbnails[post.id] ? media[0]?.url : undefined,
			comment: nikuReferenceComments[post.id]?.summary,
		};
	});
