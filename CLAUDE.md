# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

このリポジトリは、Expo 開発における汎用テンプレートです。コード品質・テスト環境・ベストプラクティスが事前整備されており、新規プロジェクトの基盤として使用します。

**技術スタック:** Expo (React Native + TypeScript) / Expo Router / Tamagui / Zustand / zod + React Hook Form
React 19.1.0 / React Native 0.81.5 / New Architecture 有効 / React Compiler 有効

## Development Commands

```bash
npx expo start          # 開発サーバー起動
npm run android         # Android エミュレータ
npm run ios             # iOS シミュレータ
npm run web             # Web
npm run reset-project   # app/ をリセット（app-example/ に退避して空の app/ を生成）
```

**品質チェック（コード変更前に必ず実行）:**

```bash
npm run check           # Prettier + ESLint の統合チェック
npm run format          # 全ファイル自動整形
npm run lint:fix        # ESLint 自動修正
```

**ユニットテスト:**

```bash
npm test                          # 全テスト実行
npm run test:watch                # ウォッチモード
npm run test:coverage             # カバレッジレポート付き
npm test -- --testPathPattern=stores   # 特定ディレクトリのテストのみ
npm test -- --testNamePattern="increment"  # 特定テスト名のみ
```

**E2E テスト（Maestro）:**

```bash
# 事前準備（初回のみ）
curl -Ls "https://get.maestro.mobile.dev" | bash  # Maestro CLI インストール（Java 17+ 必須）
npx expo run:ios     # アプリをシミュレータにビルド & インストール

# テスト実行
npm run e2e          # 全フロー実行
maestro test maestro/flows/form-demo.yaml   # 単一フローのみ実行
maestro studio       # Maestro Studio（フロー作成補助ツール）
```

## コミットワークフロー

1. コード変更
2. `npm run check` で品質確認
3. エラーがあれば `npm run format && npm run lint:fix` で修正
4. `git add` → `git commit`

**pre-commit hook（自動実行）:**

```
lint-staged: *.{js,jsx,ts,tsx} → prettier --write → eslint --fix
lint-staged: *.{json,md} → prettier --write
npm test（全テストがパスしないとコミット不可）
```

## Architecture

### ルーティング（Expo Router）

`app/` 配下のファイル構造がそのままルートになります：

- `app/_layout.tsx` — ルートレイアウト（TamaguiProvider + Stack navigator）
- `app/index.tsx` — フォームデモ（`/`）
- `app/counter.tsx` — Zustand カウンターデモ（`/counter`）
- ページ間は Expo Router の `Link` コンポーネントで遷移

`app-example/` は参考実装（タブナビゲーション・ライト/ダークテーマ）。テスト対象外。

### パスエイリアス

`@/*` → プロジェクトルートにマッピング（`tsconfig.json` / `jest.config.js` 両方で設定済み）。

```typescript
import { sampleFormSchema } from '@/schemas/sample-form.schema';
import { useCounterStore } from '@/stores';
```

### 状態管理（Zustand）

```
stores/
  index.ts            # 全ストアを一元エクスポート
  counter-store.ts    # 実装例（devtools ミドルウェア付き）
  __tests__/
```

- `create<State>()(devtools(...))` パターンで定義
- `devtools` の第3引数にアクション名を渡すと Redux DevTools で追跡可能
- コンポーネントから `useXxxStore()` で使用
- テストは `getState()` / `setState()` で React 不要

### フォーム管理（zod + React Hook Form）

```
schemas/
  *.schema.ts         # zod スキーマ定義 + z.infer<> で TypeScript 型を生成
  __tests__/
components/forms/
  *.tsx               # useForm + zodResolver + Controller で Tamagui コンポーネントを制御
```

- `mode: 'onBlur'` でバリデーションタイミングを最適化
- エラーメッセージは日本語で zod スキーマ側に記述

### UI（Tamagui）

- `tamagui.config.ts`: `@tamagui/config/v4` の `defaultConfig` を使用
- `app/_layout.tsx` の `TamaguiProvider` で全体をラップ済み
- 主要コンポーネント: `YStack`, `XStack`, `H1`〜`H3`, `Text`, `Input`, `TextArea`, `Button`, `Label`, `Switch`
- **`Checkbox` は React Native 環境で非互換のため使用禁止 → `Switch` で代替**

### テスト構成

テストファイルは対象ファイルと同階層の `__tests__/` に配置：

```
stores/__tests__/counter-store.test.ts        # Zustand 直接テスト
schemas/__tests__/sample-form.schema.test.ts  # zod safeParse テスト
components/demo/__tests__/counter-demo.test.tsx  # TamaguiProvider wrapper 付き
```

Tamagui コンポーネントのテストには `TamaguiProvider` wrapper が必須：

```typescript
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
    {children}
  </TamaguiProvider>
);
render(<MyComponent />, { wrapper });
```

## 設定ファイル

| ファイル            | 概要                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `app.json`          | Expo 設定（plugins, newArchEnabled, reactCompiler, typedRoutes）  |
| `babel.config.js`   | Tamagui プラグイン有効・テスト時は reanimated/plugin を除外       |
| `jest.config.js`    | jest-expo プリセット + `transformIgnorePatterns`（末尾 `/` なし） |
| `tsconfig.json`     | `expo/tsconfig.base` 継承 + strict + `@/*` パスエイリアス         |
| `eslint.config.js`  | Expo flat config + Prettier 統合                                  |
| `.prettierrc.json`  | singleQuote, semi, import ソート（trivago プラグイン）            |
| `tamagui.config.ts` | Tamagui defaultConfig (v4)                                        |

## テスト戦略

### テストピラミッド

このプロジェクトは以下の3層構成でテストを実装します：

```
          E2E（Maestro）
         ───────────────
         画面の表示確認のみ
         少数・重要画面に限定

       結合テスト（Jest）
      ────────────────────
    コンポーネント + ストア連携
    フォーム + バリデーション表示
    中程度の数

       単体テスト（Jest）
      ─────────────────────
   ストアのロジック・スキーマの検証ルール
   最も多く書く・高速
```

### 各テスト層の責務

#### 単体テスト — 何をテストするか

**Zustand ストア** (`stores/__tests__/`)

- 全アクション（increment / decrement / reset / incrementByAmount）の状態遷移
- 初期値の検証
- テストパターン: `getState()` / `setState()` で直接操作（React 不要）

**Zod スキーマ** (`schemas/__tests__/`)

- 有効データがパスすること
- 各フィールドの無効データがエラーになること（エラーメッセージも検証）
- 境界値（最小・最大）

**単体テストで書かない内容:** UI の見た目・レイアウト（結合テストで担う）/ 画面遷移（E2E で担う）

---

#### 結合テスト — 何をテストするか

**コンポーネント + ストア** (`components/demo/__tests__/`)

- ストアの状態がコンポーネントに正しく反映されるか
- ボタン操作でストアが更新され、表示が変化するか
- テストパターン: `TamaguiProvider` wrapper + `fireEvent` + `screen`

**フォームコンポーネント** (`components/forms/__tests__/`)

- フォーム要素が描画されるか
- バリデーションエラーが UI 上に表示されるか
- 送信成功・失敗のフィードバックが表示されるか
- テストパターン: `TamaguiProvider` wrapper + `fireEvent` + `waitFor`

**結合テストで書かない内容:** ストアのロジック詳細（単体テストで担う）/ スキーマのバリデーションルール（単体テストで担う）/ 実際のページ遷移（E2E で担う）

---

#### E2E テスト（Maestro）— 何をテストするか

- 各画面の主要要素が表示されること（クラッシュ・描画失敗の検知）
- 画面間のナビゲーションが動作すること

**E2E で書かない内容:** 詳細なバリデーションロジック（単体テストで担う）/ ストアの状態変化（単体テストで担う）/ 細かいボタン操作の確認（結合テストで担う）

---

### テストファイルの配置ルール

```
対象ファイルと同階層の __tests__/ ディレクトリに配置

stores/
  __tests__/xxx-store.test.ts        # 単体テスト
schemas/
  __tests__/xxx.schema.test.ts       # 単体テスト
components/
  demo/__tests__/xxx-demo.test.tsx   # 結合テスト
  forms/__tests__/xxx-form.test.tsx  # 結合テスト
```

### テストコードのパターン早見表

| 対象                     | ライブラリ                    | Tamagui wrapper | 非同期         |
| ------------------------ | ----------------------------- | --------------- | -------------- |
| Zustand ストア           | Jest のみ                     | 不要            | 不要           |
| Zod スキーマ             | Jest のみ                     | 不要            | 不要           |
| Tamagui コンポーネント   | @testing-library/react-native | **必須**        | 場合による     |
| React Hook Form フォーム | @testing-library/react-native | **必須**        | `waitFor` 必要 |

---

## Known Issues

- **Tamagui parse warnings**: `Error in Tamagui parse, skipping Unexpected token 'typeof'` はビルド時最適化の警告で無視可。動作に影響なし。
- **iOS ソフトウェアキーボード**: シミュレータでキーボード入力の問題が出る場合は ⌘+K で切り替え。
- **`transformIgnorePatterns` の末尾 `/`**: jest.config.js の否定先読みパターンに末尾 `/` を付けると `expo-modules-core` が変換対象外になるため削除済み。
