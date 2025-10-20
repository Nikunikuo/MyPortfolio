# ポートフォリオサイト システム概要ドキュメント

**最終更新**: 2025-10-20
**サイトURL**: https://niku.studio
**制作者**: 大鹿ニク（OosikaNiku / M1RA）

---

## 📋 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [技術スタック](#技術スタック)
3. [ディレクトリ構造](#ディレクトリ構造)
4. [ページ構成](#ページ構成)
5. [データ管理](#データ管理)
6. [コンポーネント一覧](#コンポーネント一覧)
7. [スタイリング方針](#スタイリング方針)
8. [よくある編集パターン](#よくある編集パターン)
9. [ビルド・デプロイ](#ビルドデプロイ)
10. [重要な仕様・制約](#重要な仕様制約)

---

## プロジェクト概要

**テーマ**: AI×エンターテイメント クリエイターのポートフォリオサイト

**主要コンテンツ**:
- ミュージックビデオ作品（10作品、週1-2更新）
- M1RA AITuberプロジェクト
- 開発プロジェクト（大鹿堂、AITuber開発記事）
- プロフィール・SNSリンク

**デザインコンセプト**:
- サイバーパンク・未来的
- シアン（#00ff88）アクセント
- ターミナル風UI要素
- ダークモード/ライトモード対応

---

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Astro 5.14.6 |
| 言語 | TypeScript（strict mode） |
| テンプレート | Astro Components (.astro) |
| スタイリング | CSS（スコープ + CSS Variables） |
| コンテンツ管理 | Markdown + TypeScript Data Files |
| SEO | JSON-LD構造化データ、Sitemap自動生成 |
| ビルド | 静的サイト生成（SSG） |
| ホスティング | （要確認：GitHub Pages / Vercel / Netlify?） |

---

## ディレクトリ構造

```
D:/Portfplio/
├── src/
│   ├── pages/                    # ページルート（ファイルベースルーティング）
│   │   ├── index.astro           # ホーム
│   │   ├── about.astro           # プロフィール（Nikuページ）
│   │   ├── work.astro            # 作品一覧
│   │   ├── 404.astro             # 404エラーページ
│   │   ├── mira/
│   │   │   └── index.astro       # M1RAプロジェクトページ
│   │   └── work/
│   │       ├── [...slug].astro   # 動的作品詳細ページ
│   │       └── music-videos/
│   │           ├── index.astro   # MV一覧ページ
│   │           └── [slug].astro  # 個別MVページ（01-10）
│   ├── components/               # 再利用可能コンポーネント
│   │   ├── MainHead.astro        # SEO/AIEO対策（構造化データ）
│   │   ├── Nav.astro             # フローティングナビゲーション
│   │   ├── Footer.astro          # フッター
│   │   ├── BaseLayout.astro      # レイアウトラッパー
│   │   ├── Hero.astro            # ヒーローセクション
│   │   ├── Grid.astro            # グリッドレイアウト
│   │   ├── Pill.astro            # バッジ/タグ
│   │   ├── PortfolioPreview.astro # 作品プレビューカード
│   │   ├── Icon.astro            # SVGアイコン
│   │   ├── IconPaths.ts          # アイコンパス定義
│   │   ├── LoadingScreen.astro   # ターミナル風ローディング
│   │   ├── YouTubeEmbed.astro    # YouTube埋め込み
│   │   ├── ContactCTA.astro      # コンタクトCTA
│   │   ├── CallToAction.astro    # 汎用CTAボタン
│   │   ├── Skills.astro          # スキルセクション
│   │   └── ThemeToggle.astro     # ダークモード切替
│   ├── layouts/
│   │   └── BaseLayout.astro      # メインレイアウト
│   ├── content/
│   │   └── work/                 # Markdown作品データ
│   │       ├── sample-mv-01.md
│   │       └── sample-short-01.md
│   ├── data/
│   │   └── musicVideos.ts        # ★MVデータ管理ファイル（重要）
│   ├── content.config.ts         # Content Collection設定
│   └── styles/
│       └── global.css            # グローバルCSS変数
├── public/                       # 静的アセット
│   ├── assets/
│   │   └── backgrounds/          # 背景画像（light/dark）
│   ├── images/
│   │   ├── mira/                 # M1RA関連画像（seasonal: spring/summer/fall/winter）
│   │   ├── card*.png             # ヒーローカード画像
│   │   ├── top.png               # メインヒーロー画像
│   │   ├── niku.png              # プロフィール画像
│   │   └── Lastest.png           # 最新作品アイコン
│   ├── movies/
│   │   └── BG.mp4                # 背景動画
│   ├── robots.txt
│   └── favicon.svg
├── astro.config.mjs              # Astro設定
├── package.json                  # 依存関係
├── tsconfig.json                 # TypeScript設定
└── dist/                         # ビルド出力（gitignore）
```

---

## ページ構成

### ルーティング

| URL | ファイル | 説明 |
|-----|---------|------|
| `/` | `pages/index.astro` | ホーム（ヒーロー、最新6作品、リンク集） |
| `/about/` | `pages/about.astro` | プロフィール（niku.png、フワフワアニメーション） |
| `/work/` | `pages/work.astro` | 作品一覧（3カテゴリー構成） |
| `/work/music-videos/` | `pages/work/music-videos/index.astro` | MV一覧（10作品） |
| `/work/music-videos/01/` | `pages/work/music-videos/[slug].astro` | 個別MVページ（01-10） |
| `/work/[slug]/` | `pages/work/[...slug].astro` | Markdown作品詳細ページ |
| `/mira/` | `pages/mira/index.astro` | M1RAプロジェクト専用ページ |
| `/404` | `pages/404.astro` | 404エラーページ |

### ページ特性

**ホームページ** (`index.astro`):
- ローディング画面（初回のみ、2.5秒/タイムアウト5秒）
- ヒーローセクション
- 最新作品6件表示
- リンク集（YouTube, Note, GitHub, Booth等）

**Workページ** (`work.astro`):
- 3カテゴリー構成:
  1. ディスコグラフィー（MV、楽曲リンク、AIアニメ）
  2. 開発プロジェクト（大鹿堂、M1RA、Coming Soon）
  3. その他（実験作品、オープンソース）

**MVページ** (`work/music-videos/index.astro`):
- クリック可能なカード一覧
- 一言紹介（intro）表示
- 「詳細を見る →」リンク

**個別MVページ** (`work/music-videos/[slug].astro`):
- YouTube埋め込み
- 作品紹介
- 「制作秘話を読む」ボタン（Note）
- 一覧へ戻るリンク
- VideoObject構造化データ

**M1RAページ** (`mira/index.astro`):
- プロジェクトコンセプト説明
- 3つの特徴カード（自己の芽生え、共鳴する心、夢の共創）
- Introduction Video（YouTube埋め込み）
- Related Works（2作品：名前の無い木、NEOSPHERE PARADE）
- 季節アーカイブ（春夏秋冬の画像）

---

## データ管理

### ⭐ 重要：ミュージックビデオデータ

**ファイル**: `src/data/musicVideos.ts`

このファイルで全10作品のMVデータを一元管理。以下の2ファイルで共有：
- `src/pages/work/music-videos/index.astro`（一覧ページ）
- `src/pages/work/music-videos/[slug].astro`（個別ページ）

**データ構造**:
```typescript
export const musicVideos = [
  {
    slug: '01',                    // URL用（連番）
    title: '君は人間ですか',        // タイトル
    youtubeId: '818FAfWCp18',      // YouTube動画ID
    intro: 'AIと人間の境界を...',  // 一言紹介
    noteUrl: 'https://note.com...', // Note制作秘話リンク
    description: '',               // （未使用）
    releaseDate: '',               // （未使用、今後追加可）
    isNew: true,                   // NEWバッジフラグ
  },
  // ... 10作品分
];
```

**編集方法**:
1. `src/data/musicVideos.ts`を開く
2. 該当作品のフィールドを編集
3. ビルド＆プッシュ → 一覧と個別ページ両方に反映

### Markdown作品データ

**場所**: `src/content/work/*.md`

**用途**: 将来的な作品詳細ページ用（現在サンプル2件のみ）

**スキーマ**（`content.config.ts`）:
```typescript
{
  title: string,
  description: string,
  publishDate: Date,
  tags: string[],
  img: string,
  img_alt: string,
  youtubeUrl?: string,
}
```

---

## コンポーネント一覧

### レイアウト系

**BaseLayout.astro**:
- メインレイアウトラッパー
- 背景動画（BG.mp4）
- ナビゲーション
- フッター
- View Transitions有効化

**MainHead.astro**:
- `<head>`タグ内のメタ情報
- JSON-LD構造化データ（Person, Organization, Breadcrumb, VideoObject等）
- OGタグ、Twitter Card
- Canonical URL

### UI系

**Nav.astro**:
- フローティングナビゲーション
- メニュー項目: Home / Niku / Work / M1RA
- テーマ切替ボタン
- レスポンシブハンバーガーメニュー

**Hero.astro**:
- ヒーローセクションコンポーネント
- Props: `title`, `tagline`, `align`（center/start）

**Grid.astro**:
- レスポンシブグリッドレイアウト
- Variants: `offset`, `small`

**PortfolioPreview.astro**:
- 作品プレビューカード
- YouTube埋め込み対応（youtubeUrl指定時）
- タグ、日付表示

**Icon.astro**:
- SVGアイコンコンポーネント
- グラデーション対応
- `IconPaths.ts`からパス読み込み

**LoadingScreen.astro**:
- ターミナル風ローディング画面
- ホームページのみ表示
- DOMContentLoadedで自動非表示（2.5秒/タイムアウト5秒）

**ThemeToggle.astro**:
- ダークモード/ライトモード切替
- localStorageに保存
- システム設定検出

---

## スタイリング方針

### CSS Variables（`styles/global.css`）

**カラーシステム**:
```css
/* アクセントカラー */
--accent-light: #c561f6;
--accent-regular: #7611a6;
--accent-dark: #1c0056;

/* M1RAテーマカラー */
--mira-cyan: #00ff88;

/* グレースケール */
--gray-0 ~ --gray-999（10段階）

/* グラデーション */
--gradient-subtle
--gradient-accent
--gradient-accent-orange
```

**タイポグラフィ**:
```css
--text-sm ~ --text-5xl（8サイズ）
--font-system
--font-body
--font-brand
```

**シャドウ**:
```css
--shadow-sm
--shadow-md
--shadow-lg
```

### スコープドスタイル

各`.astro`ファイル内の`<style>`タグでコンポーネント固有のスタイルを定義。

**レスポンシブ**:
- ブレークポイント: `50em`（800px）
- モバイルファースト設計

---

## よくある編集パターン

### 1. 新しいMVを追加

**手順**:
1. `src/data/musicVideos.ts`を開く
2. 配列の**先頭**に新作を追加:
   ```typescript
   {
     slug: '11',  // 次の連番
     title: '新作タイトル',
     youtubeId: 'YouTube動画ID',
     intro: '一言紹介文',
     noteUrl: 'https://note.com/m1ra_project/n/xxx-new-work',
     description: '',
     releaseDate: '',
     isNew: true,  // 最新フラグ（前作のisNewをfalseに変更）
   }
   ```
3. `npm run build`
4. コミット＆プッシュ

### 2. Note制作秘話リンクを更新

**手順**:
1. Noteで記事公開 → URLコピー
2. `src/data/musicVideos.ts`を開く
3. 該当作品の`noteUrl`を書き換え:
   ```typescript
   noteUrl: 'https://note.com/m1ra_project/n/n123abc456def',
   ```
4. `npm run build` → コミット＆プッシュ

### 3. プロフィール画像を変更

**手順**:
1. 新しい画像を`public/images/`に配置
2. `src/pages/about.astro`を開く
3. 画像パスを変更:
   ```html
   <img src="/images/new-profile.png" alt="..." />
   ```

### 4. M1RAページの季節画像を差し替え

**場所**: `public/images/mira/`
- `spring.png`
- `summer.png`
- `fall.png`
- `winter.png`

画像を同じファイル名で上書き保存 → ビルド＆プッシュ

### 5. ナビゲーションメニューを変更

**ファイル**: `src/components/Nav.astro`

メニュー項目の追加/削除/変更が可能。

---

## ビルド・デプロイ

### ローカルビルド

```bash
# 開発サーバー起動
npm run dev

# ビルド（本番環境）
npm run build

# ビルド結果をローカルでプレビュー
npm run preview
```

### Git操作

```bash
# 変更確認
git status
git diff

# ステージング
git add .

# コミット
git commit -m "変更内容の説明"

# プッシュ
git push
```

### デプロイ

- プッシュ後、自動デプロイされる想定（要確認）
- `dist/`フォルダが生成物
- サイトマップ自動生成: `dist/sitemap-index.xml`

---

## 重要な仕様・制約

### 1. 改行コード警告

Gitが`LF`→`CRLF`変換警告を出すが、**動作に影響なし**。無視してOK。

### 2. YouTubeサムネイル

**推奨**: `sddefault.jpg`（標準画質）
- `maxresdefault.jpg`は動画によって存在しない場合あり
- `sddefault.jpg`は確実に表示される

**URL形式**:
```
https://i.ytimg.com/vi/{VIDEO_ID}/sddefault.jpg
```

### 3. ローディング画面

**表示条件**: ホームページ（`/`）のみ
**制御**: `LoadingScreen.astro`内のJavaScript
- DOMContentLoaded後2.5秒でフェードアウト
- 安全のため5秒でタイムアウト強制非表示

### 4. View Transitions

ページ遷移時のスムーズなアニメーション。
`BaseLayout.astro`で有効化済み。

### 5. SEO構造化データ

各ページで以下を実装:
- **全ページ**: Person, Organization, Breadcrumb
- **MVページ**: VideoObject, ItemList
- **M1RAページ**: CreativeWork
- **Aboutページ**: ProfilePage

### 6. ダークモード

- デフォルト: ダークモード
- localStorage: `theme-preference`キーで保存
- システム設定も自動検出

### 7. アイコンシステム

**アイコン追加方法**:
1. `src/components/IconPaths.ts`に追加
2. `Icon.astro`コンポーネントで使用:
   ```astro
   <Icon icon="アイコン名" size="1.5em" />
   ```

---

## トラブルシューティング

### ビルドエラー

**症状**: `musicVideos is not defined`
**原因**: データファイルのインポート忘れ
**解決**: `import { musicVideos } from '../data/musicVideos';`

### 画像が表示されない

**チェックポイント**:
1. 画像が`public/`内に存在するか
2. パスが`/`から始まっているか（例: `/images/xxx.png`）
3. ファイル名の大文字小文字が一致しているか

### スタイルが反映されない

**原因**: キャッシュ
**解決**:
1. ブラウザのハードリフレッシュ（Ctrl+Shift+R）
2. `npm run build`で再ビルド

---

## 今後の拡張予定

- [ ] Markdown作品データの本格活用
- [ ] ブログ機能の追加
- [ ] 検索機能
- [ ] タグフィルタリング
- [ ] RSS Feed
- [ ] 英語版ページ

---

## 連絡先・リンク

- **YouTube**: @M1RA_Archive_Project
- **X (Twitter)**: @M1RA_A_Project
- **Note**: m1ra_project
- **GitHub**: Nikunikuo
- **Booth**: nikuoosika.booth.pm
- **Suno**: @yajusika

---

**このドキュメントは次回セッションでClaudeが素早く状況を把握するために作成されました。**
**変更があった場合は随時更新してください。**
