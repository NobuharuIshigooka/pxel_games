module.exports = function (api) {
  api.cache(true);
  const isTest = process.env.NODE_ENV === 'test';
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          // 開発環境とテスト環境の両方で抽出を無効化
          disableExtraction: process.env.NODE_ENV === 'development' || isTest,
        },
      ],
      // NOTE: this is only necessary if you are using reanimated for animations
      // テスト環境では除外する（worklet トランスフォームが Jest の CommonJS 環境と競合するため）
      ...(isTest ? [] : ['react-native-reanimated/plugin']),
    ],
  };
};
