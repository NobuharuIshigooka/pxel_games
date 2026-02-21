# Expo テンプレートリポジトリ

このリポジトリは、Expo + React Nativeプロジェクトを開発する際の汎用的なテンプレートリポジトリです。

## 🎯 目的

新規のExpoプロジェクトを迅速に立ち上げるための基盤を提供します。以下の要素が事前にセットアップされています：

- ✅ コード品質管理（ESLint + Prettier + Husky）
- ✅ Git pre-commit フック（自動フォーマット・Lint）
- ✅ TypeScript strict mode
- ✅ テスト環境（セットアップ予定）
- ✅ ファイルベースルーティング（Expo Router）
- ✅ TypeScript設定とパスエイリアス
- ✅ React Native新アーキテクチャ対応
- ✅ ベストプラクティスの実装例

## 🚀 使い方

### 1. リポジトリのクローン

```bash
git clone <このリポジトリのURL>
cd expo_template
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npx expo start
```

以下のオプションでプラットフォーム別に起動できます：

```bash
npm run android  # Androidエミュレーターで起動
npm run ios      # iOSシミュレーターで起動
npm run web      # Web版で起動
```

### 4. 新規プロジェクトとして開始

クリーンな状態から開発を始める場合：

```bash
npm run reset-project
```

このコマンドは、スターターコードを `app-example/` ディレクトリに移動し、空の `app/` ディレクトリを作成します。

## 📁 プロジェクト構成

```
expo_template/
├── app/              # アプリケーションのメインコード（ファイルベースルーティング）
├── app-example/      # 実装例・サンプルコード
├── assets/           # 画像、フォントなどの静的リソース
├── constants/        # 定数定義（テーマ、設定など）
├── hooks/            # カスタムフック
├── components/       # 再利用可能なコンポーネント
├── app.json          # Expo設定ファイル
├── tsconfig.json     # TypeScript設定
└── eslint.config.js  # ESLint設定
```

## 🛠 技術スタック

- **Expo SDK**: 最新版
- **React Native**: 0.81.5
- **React**: 19.1.0
- **TypeScript**: 型安全な開発
- **Expo Router**: ファイルベースルーティング（v6.0）
- **React Navigation**: ナビゲーション管理
- **React Native Reanimated**: アニメーション（v4.1）
- **React Native Gesture Handler**: ジェスチャー処理（v2.28）

## ⚙️ 主要な設定

- TypeScript strict modeが有効
- React Native新アーキテクチャが有効（`newArchEnabled: true`）
- Typed routesによる型安全なナビゲーション
- React Compiler実験的機能が有効
- パスエイリアス `@/*` が設定済み

## 📝 コマンド一覧

### 開発コマンド

```bash
npm run android        # Android向けビルド
npm run ios            # iOS向けビルド
npm run web            # Web向けビルド
npm run reset-project  # プロジェクトのリセット
```

### コード品質管理

```bash
npm run lint           # ESLintによるコードチェック
npm run lint:fix       # ESLint自動修正
npm run format         # Prettierで全ファイルを整形
npm run format:check   # フォーマットチェック（CI用）
npm run check          # format + lint 統合チェック
```

## 🔍 コード品質管理

### 自動フォーマット & Lint

このテンプレートには、コード品質を保つための仕組みが組み込まれています：

#### Prettier

- コードスタイルの自動統一
- シングルクォート、セミコロン使用
- import文の自動ソート

#### ESLint

- コード品質チェック
- Expo公式設定ベース
- Prettierとの競合を自動解消

#### Husky + lint-staged

**Git コミット時に自動実行:**

```bash
git commit
↓
pre-commit hook 実行
↓
変更されたファイルのみ Prettier + ESLint 実行
↓
自動修正してコミット完了
```

品質基準を満たさないコードは自動的に修正されるため、常に統一されたコードスタイルが保たれます。

### VS Code 設定

保存時に自動でフォーマットと ESLint 修正が実行されます。推奨拡張機能：

- Prettier - Code formatter
- ESLint
- Expo Tools

## 🧪 テスト（セットアップ予定）

テスト環境は今後整備予定です。

## 📚 詳細情報

- [Expo公式ドキュメント](https://docs.expo.dev/)
- [Expo Routerドキュメント](https://docs.expo.dev/router/introduction/)
- [React Native公式ドキュメント](https://reactnative.dev/)

## 🤝 コントリビューション

このテンプレートリポジトリの改善提案は歓迎します。

## 📄 ライセンス

このテンプレートは自由に使用・改変できます。
