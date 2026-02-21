import { ScrollView } from 'react-native';

import { Link } from 'expo-router';

import { Button, H1, Paragraph, XStack, YStack } from 'tamagui';

import { CounterDemo } from '@/components/demo/counter-demo';

export default function Counter() {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <YStack
        flex={1}
        padding="$4"
        space="$6"
        maxWidth={600}
        alignSelf="center"
        width="100%"
      >
        {/* ヘッダーセクション */}
        <YStack space="$3" marginTop="$4">
          <H1>Zustandデモ</H1>
          <Paragraph color="$gray11" fontSize="$4">
            このページでは、状態管理ライブラリ Zustand の統合例を示しています。
          </Paragraph>
        </YStack>

        {/* ナビゲーションセクション */}
        <XStack space="$3" flexWrap="wrap">
          <Link href="/" asChild>
            <Button theme="gray">フォームデモに戻る</Button>
          </Link>
        </XStack>

        {/* カウンターデモセクション */}
        <CounterDemo />
      </YStack>
    </ScrollView>
  );
}
