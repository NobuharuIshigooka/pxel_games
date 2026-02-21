import { ScrollView } from 'react-native';

import { Link } from 'expo-router';

import { Button, H1, H3, Paragraph, XStack, YStack } from 'tamagui';

import { SampleForm } from '@/components/forms/sample-form';

export default function Index() {
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
          <H1>フォームデモ</H1>
          <Paragraph color="$gray11" fontSize="$4">
            このページでは、zod + React Hook Form + Tamagui
            の統合例を示しています。
          </Paragraph>
        </YStack>

        {/* ナビゲーションセクション */}
        <XStack space="$3" flexWrap="wrap">
          <Link href="/counter" asChild>
            <Button theme="blue">Zustandカウンターデモを見る</Button>
          </Link>
        </XStack>

        {/* サンプルフォームセクション */}
        <YStack space="$3">
          <H3>サンプルフォーム</H3>
          <Paragraph color="$gray10" fontSize="$3">
            以下のフォームは各種バリデーションパターンの参考例です。
          </Paragraph>
          <SampleForm />
        </YStack>
      </YStack>
    </ScrollView>
  );
}
