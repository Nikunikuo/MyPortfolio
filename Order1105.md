Astroサイトの多言語化実装依頼書 (Claude Code向け)
この依頼書は、Astroで作成されたサイトに日本語 (JP) と英語 (EN) の言語切り替え機能を、最も実装の簡単なクライアントサイド方式で追加するための具体的な指示です。

1. 目的と技術スタックの明示
目標: 既存のAstroサイトに、日本語と英語の多言語対応機能を追加する。

技術:

JavaScriptを使用して、ページ内の翻訳テキストを切り替える。

URLは変更しない（/en/などのサブディレクトリは作成しない）。

ブラウザの言語設定ではなく、ユーザーの操作で言語を切り替えることを優先する。

2. 実装してほしい具体的な機能
A. HTMLの変更
翻訳が必要な要素に、一意の**data-i18n属性**を付与し、JavaScriptから操作できるようにしてください。

依頼内容:

以下の例を参考に、翻訳が必要なすべてのテキスト要素にdata-i18n="キー名"を追加してください。

ナビゲーションバー（navタグ内など）に、「JP / EN」の切り替えボタン（またはドロップダウン）を追加し、言語切り替えを行うためのID（例：id="lang-switch-btn"）を付与してください。

HTML変更例:

HTML

<h1>大鹿ニク / M1RA</h1>
<p>AI技術で人間の創造性を解放する</p>

<h1 data-i18n="main_title">大鹿ニク / M1RA</h1>
<p data-i18n="mission_text">AI技術で人間の創造性を解放する</p>

<button id="lang-switch-btn">EN</button>
B. JavaScriptの作成
i18n.js というファイルを作成し、以下の機能を実装してください。

依頼内容:

翻訳データの管理: 次項で提供するJSON形式の翻訳データを、const translations = { ... }としてファイル内に定義してください。

言語の記憶: ユーザーが選択した言語（jpまたはen）をブラウザのlocalStorageに保存し、次回訪問時に保存された言語でページが表示されるように初期設定を行ってください。

切り替え関数: data-i18n属性と翻訳データを使って、ページの全テキストを切り替える関数（例：setLanguage(lang)）を作成してください。

イベントリスナー: lang-switch-btnがクリックされた際、現在の言語を判別し、setLanguage()関数を実行して言語を切り替える処理を実装してください。

3. 翻訳データ（JSON）の例
AIが使用する翻訳データの構造は以下の通りです。この構造を想定して、コードを設計してください。

JSON

const translations = {
  "main_title": {
    "jp": "大鹿ニク / M1RA",
    "en": "Niku Ooshika / M1RA"
  },
  "mission_text": {
    "jp": "AI技術で人間の創造性を解放する",
    "en": "Unlocking human creativity with AI technology"
  },
  "latest_works": {
    "jp": "Latest Works",
    "en": "Latest Works"
  }
  // ※この下に、サイト内の全翻訳テキストを追記する
};