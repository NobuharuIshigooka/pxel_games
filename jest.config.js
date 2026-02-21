/** @type {import('jest').Config} */
const config = {
  // jest-expo プリセットで React Native 向け Jest 環境を構築
  preset: 'jest-expo',

  // テストファイルのマッチパターン
  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/*.{spec,test}.{ts,tsx}'],

  // app-example/ はリファレンス実装のため除外
  testPathIgnorePatterns: ['/node_modules/', '/app-example/'],

  // テスト環境のセットアップファイル
  setupFiles: ['./jest.setup.ts'],

  // @/* パスエイリアス -> プロジェクトルート へのマッピング
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // ESM パッケージを Babel トランスパイル対象に含める
  //
  // tamagui, @tamagui/*, zod は "type": "module"（ESM）で配布されており、
  // Jest の CommonJS 環境で動作させるには Babel でのトランスパイルが必要。
  //
  // 否定先読み (?!...) で
  // 「これらのパッケージ以外の node_modules はトランスパイルしない」を表現する。
  // jest-expo プリセットのデフォルト設定を完全上書きするため、
  // プリセットが元々カバーするパッケージも漏らさず列挙する。
  transformIgnorePatterns: [
    'node_modules/(?!(jest-expo|@expo|expo|@unimodules|react-native|@react-native|tamagui|@tamagui|zod))',
  ],

  // テストカバレッジの収集対象
  collectCoverageFrom: [
    'stores/**/*.{ts,tsx}',
    'schemas/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!**/__tests__/**',
    '!**/*.d.ts',
  ],
};

module.exports = config;
