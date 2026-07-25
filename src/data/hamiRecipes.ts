import recipeCollection from './hami-recipes.json';

export type SourceType = 'episode_fact' | 'household_proposal' | 'safety_guidance';

type RecipeMeta = {
	episodeNumber: number;
	youtubeId?: string;
	releaseLabel?: string;
	hasGeneratedMedia: boolean;
};

const recipeMetaBySlug: Record<string, RecipeMeta> = {
	'butter-rayu-tkg': {
		episodeNumber: 1,
		youtubeId: 'vose8t_6i-o',
		hasGeneratedMedia: false,
	},
	'kissaten-napolitan': {
		episodeNumber: 2,
		youtubeId: 'Piyz9IQu_Zc',
		hasGeneratedMedia: false,
	},
	'cinema-three-hotdogs': {
		episodeNumber: 3,
		youtubeId: 'nK4XO9wyGe8',
		hasGeneratedMedia: true,
	},
	'karaage-crisp-reheat': {
		episodeNumber: 4,
		youtubeId: '9_MwKwJKtds',
		hasGeneratedMedia: false,
	},
	'double-cheese-ham-toast': {
		episodeNumber: 5,
		youtubeId: '68pRZfUvvuQ',
		hasGeneratedMedia: false,
	},
	'friendship-fuwatoro-omurice': {
		episodeNumber: 6,
		youtubeId: 'exdRnPs4628',
		hasGeneratedMedia: true,
	},
	'tuna-tomato-hot-sand': {
		episodeNumber: 7,
		youtubeId: 'hg6qIefyr_I',
		hasGeneratedMedia: false,
	},
	'dreamy-anko-taiyaki': {
		episodeNumber: 8,
		youtubeId: 'Xyd7OFZuNN0',
		hasGeneratedMedia: true,
	},
	'hardboiled-caramel-pudding': {
		episodeNumber: 9,
		youtubeId: 'EiPHsyd9FbU',
		hasGeneratedMedia: true,
	},
	'fried-egg-breakfast-war': {
		episodeNumber: 10,
		youtubeId: 'wqFMN1CoDXQ',
		hasGeneratedMedia: true,
	},
	'chiles-en-nogada-two-ways': {
		episodeNumber: 11,
		youtubeId: 'ZaEJX0P4Ggg',
		hasGeneratedMedia: false,
	},
	'ameoto-yaki-gyoza': {
		episodeNumber: 12,
		youtubeId: 'o-uS71tairk',
		hasGeneratedMedia: false,
	},
	'home-spicy-miso-ramen': {
		episodeNumber: 13,
		youtubeId: 'qhDBoc90boE',
		hasGeneratedMedia: true,
	},
	'nostalgic-rendang': {
		episodeNumber: 14,
		youtubeId: 'vyYJYYfK98A',
		hasGeneratedMedia: false,
	},
};

export const recipes = recipeCollection.recipes
	.map((recipe) => {
		const meta = recipeMetaBySlug[recipe.slug];

		if (!meta) {
			throw new Error(`Missing Hami recipe metadata for ${recipe.slug}`);
		}

		return { ...recipe, meta };
	})
	.sort((a, b) => a.meta.episodeNumber - b.meta.episodeNumber);

export type HamiRecipe = (typeof recipes)[number];

export const sourceTypeLegend = recipeCollection.sourceTypeLegend;

export function recipePath(slug: string) {
	return `/hami-preview/recipes/${slug}/`;
}

export function episodeImagePath(slug: string, fileName: string) {
	const avifName = fileName.replace(/\.(?:png|jpe?g|webp)$/i, '.avif');
	return `/images/hami/recipes/episodes/${slug}/${avifName}`;
}

export function episodeSocialImagePath(slug: string, fileName: string) {
	return `/images/hami/recipes/episodes/${slug}/${fileName}`;
}

export function generatedImagePath(
	slug: string,
	kind: 'ingredients' | 'process'
) {
	return `/images/hami/recipes/generated/${slug}/${kind}.avif`;
}
