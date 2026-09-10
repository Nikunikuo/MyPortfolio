interface ReferenceComment {
	/** ニク本人の引用リポストを、意味を変えず15文字前後に要約した一言。 */
	summary: string;
	/** 要約元。作品の投稿ではなく @M1RA_A_Project 本人の引用リポスト。 */
	quoteUrl: string;
	/** 引用先の本文は含めず、ニク本人が書いた本文だけを保存。 */
	quoteText: string;
}

/**
 * キーは nikuReferencePosts.ts にある作品の投稿ID。
 * 本人の引用リポストとの対応・本文を確認してから追加する。
 * 未確認の作品には代わりの感想や仮文を出さず、コメント欄を表示しない。
 * Xの作者名・サムネイルのスナップショットとは別に管理する。
 */
export const nikuReferenceComments: Record<string, ReferenceComment> = {};
