# homepage_next セットアップと更新方法（Google スプレッドシート連携）

この Next.js プロジェクトでは、トップページの各セクションを **Google スプレッドシート** から読み込んで表示します。

## 1. 必要環境

- Node.js 18 以上（LTS 推奨）
- npm もしくは yarn / pnpm

### 依存パッケージのインストール

```bash
cd homepage_next
npm install
```

### 開発サーバ起動

```bash
npm run dev
```

## 2. スプレッドシート構成

1 つのスプレッドシートファイルの中でシートを分けて管理する想定です（もちろん、別ファイルに分けても OK です。その場合は URL だけ変更してください）。

各シートは「ウェブに公開」し、**CSV 形式**のエクスポート URL を環境変数に設定します。

`.env` を作成して、`.env.example` を参考に URL を設定してください。

```bash
cp .env.example .env
```

### 2.1 Biography シート

- 環境変数: `BIOGRAPHY_SHEET_URL`
- 想定カラム:
  - A列: `date`（例: `2024.04-現在`）
  - B列: `text`（例: `神戸市立工業高等専門学校 専攻科 電気電子工学専攻`）
- 1 行目はヘッダとして使用（任意の名前で OK）

### 2.2 Publications シート

- 環境変数: `PUBLICATIONS_SHEET_URL`
- 想定カラム:
  - A列: `category` … 例: `国内査読あり`, `国内査読なし`, `コンテスト` など
  - B列: `authors` … 著者名
  - C列: `title` … 論文タイトル
  - D列: `detail` … 学会名・開催地・年など
  - E列: `linkUrl` … プロジェクトページなどの URL（空欄可）
- ページ側では `category` ごとにグループ化して表示します。

### 2.3 Qualifications シート

- 環境変数: `QUALIFICATIONS_SHEET_URL`
- 想定カラム:
  - A列: `date`
  - B列: `text`（資格名など）

### 2.4 Awards シート（表彰状棚 UI）

- 環境変数: `AWARDS_SHEET_URL`
- 想定カラム:
  - A列: `date` … 受賞年月日
  - B列: `title` … 受賞名
  - C列: `imageUrl` … **表彰状画像の URL**
  - D列: `linkUrl` … 詳細ページへの URL（任意）

ここで指定する `imageUrl` は、以下のような場所にホストされた画像 URL を想定しています。

- GitHub Pages や自分のドメイン配下（例: `https://masatohci.com/img/awards/xxxxx.jpg`）
- もしくは、Google ドライブなどに公開した画像 URL

### 2.5 Volunteer シート

- 環境変数: `VOLUNTEER_SHEET_URL`
- 想定カラム:
  - A列: `date`
  - B列: `text`

### 2.6 Internship シート

- 環境変数: `INTERNSHIP_SHEET_URL`
- 想定カラム:
  - A列: `date`
  - B列: `text`

## 3. 画像の検索エンジン対策

- `src/app/layout.tsx` にて `<meta name="robots" content="noimageindex">` 相当を設定しています。
- `src/app/robots.ts` で `Googlebot-Image` に対して `Disallow: /` を返すようにしています。

これにより、サイト内の画像は検索エンジンの**画像検索結果には出にくく**なります（完全な保証ではありませんが、主要な検索エンジンへの明示的な指示になります）。

## 4. デザインとレスポンシブ

- `src/app/globals.css` で元の `style.css` を踏襲しつつ、スマホ表示の改善（flex レイアウト、グリッドレイアウトなど）を追加しています。
- `Awards` セクションは `AwardsShelf` コンポーネントで「棚に表彰状が並ぶ」イメージの UI になっています。

## 5. 更新フローのイメージ

1. Google スプレッドシートを開く
2. 各シート（Biography / Publications / Qualifications / Awards / Volunteer / Internship）を編集
3. 変更を保存
4. ウェブ公開している CSV URL は変わらないので、そのまま Next.js サイトを再読み込みすれば内容が更新されます。

Next.js 側のコードを触らずに、スプレッドシート上の編集だけでホームページを更新できます。

