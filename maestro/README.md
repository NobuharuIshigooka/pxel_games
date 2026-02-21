# Maestro E2E テスト

ローカル環境で Maestro を使った E2E テストを手動実行するための手順です。

## 前提条件

- **Java 17 以上**がインストールされていること
- **Maestro CLI** がインストールされていること（後述）
- アプリがシミュレータ / エミュレータにビルド済みであること（`npm run ios` で初回ビルド）

## セットアップ（初回のみ）

### 1. Maestro CLI をインストール

```bash
# Xcode 15 以降の環境
curl -Ls "https://get.maestro.mobile.dev" | bash

# Xcode 14 の環境（バージョンを指定）
export MAESTRO_VERSION=1.39.13; curl -Ls "https://get.maestro.mobile.dev" | bash
```

> **注意:** Maestro 2.x は Xcode 15 以降が必要です。Xcode 14 環境では `1.39.13` を指定してください。

インストール後、ターミナルを再起動するか以下を実行してパスを通します：

```bash
export PATH="$PATH:$HOME/.maestro/bin"
```

### 2. アプリをビルドしてシミュレータにインストール

```bash
# iOS
npm run ios      # expo run:ios

# Android
npm run android  # expo run:android
```

> Maestro はアプリを自動でビルドしません。事前にシミュレータ / エミュレータへのインストールが必要です。

## テスト実行

```bash
npm run e2e                         # 全フロー実行
maestro test flows/form-demo.yaml   # 単一フロー実行
```

## フロー一覧

| ファイル                  | 内容                                                               |
| ------------------------- | ------------------------------------------------------------------ |
| `flows/form-demo.yaml`    | フォームデモ画面（`/`）の要素が正しく表示されることを確認          |
| `flows/counter-demo.yaml` | カウンターデモ画面（`/counter`）の要素が正しく表示されることを確認 |

## Maestro Studio（フロー作成補助）

ビジュアルツールでフローをインタラクティブに作成・デバッグできます：

```bash
maestro studio
```

ブラウザが開き、シミュレータの画面を見ながら `tapOn` / `assertVisible` などのコマンドを生成できます。

## トラブルシューティング

**`App not found` エラー:**

- `appId` が正しいか確認してください（現在: `com.anonymous.expo-template`）
- `npm run ios` でアプリをビルド・インストールしてから実行してください

**要素が見つからないエラー:**

- 画面に表示されているテキストと YAML 内の文字列が完全一致しているか確認してください
- Maestro は要素が表示されるまで自動で待機しますが、タイムアウトする場合は `- waitForAnimationToEnd` を追加してみてください
