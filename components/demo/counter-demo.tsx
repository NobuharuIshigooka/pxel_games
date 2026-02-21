import { Button, H2, Paragraph, Text, XStack, YStack } from 'tamagui';

import { useCounterStore } from '@/stores';

export function CounterDemo() {
  const { count, increment, decrement, reset, incrementByAmount } =
    useCounterStore();

  return (
    <YStack space="$4" width="100%" padding="$4" borderRadius="$4">
      {/* タイトルと説明 */}
      <YStack space="$2">
        <H2>カウンターデモ</H2>
        <Paragraph color="$gray11" fontSize="$3">
          Zustandストアを使用したシンプルなカウンター実装例です。
        </Paragraph>
      </YStack>

      {/* 現在の値表示 */}
      <YStack
        alignItems="center"
        justifyContent="center"
        padding="$6"
        backgroundColor="$blue2"
        borderRadius="$4"
      >
        <Text color="$gray11" fontSize="$3" marginBottom="$2">
          現在の値
        </Text>
        <Text fontSize="$10" fontWeight="bold" color="$blue10">
          {count}
        </Text>
      </YStack>

      {/* ボタン群 */}
      <XStack space="$3" justifyContent="center" flexWrap="wrap">
        <Button size="$4" onPress={decrement} theme="red">
          -1
        </Button>
        <Button size="$4" onPress={reset} theme="gray">
          リセット
        </Button>
        <Button size="$4" onPress={increment} theme="blue">
          +1
        </Button>
        <Button size="$4" onPress={() => incrementByAmount(5)} theme="green">
          +5
        </Button>
      </XStack>

      {/* 説明テキスト */}
      <YStack space="$2" marginTop="$2">
        <Text color="$gray10" fontSize="$2">
          💡 ヒント: Webブラウザで実行時、Redux
          DevToolsを使用して状態の変更履歴を確認できます。
        </Text>
      </YStack>
    </YStack>
  );
}
