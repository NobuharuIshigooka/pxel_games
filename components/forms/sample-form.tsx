import { useState } from 'react';

import { Switch } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Label, Text, TextArea, XStack, YStack } from 'tamagui';

import {
  type SampleFormData,
  sampleFormSchema,
} from '@/schemas/sample-form.schema';

export function SampleForm() {
  const [submitStatus, setSubmitStatus] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SampleFormData>({
    resolver: zodResolver(sampleFormSchema),
    mode: 'onBlur', // バリデーションタイミング最適化
    defaultValues: {
      name: '',
      email: '',
      age: undefined,
      message: '',
      agreed: false,
    },
  });

  const onSubmit = async (data: SampleFormData) => {
    try {
      setSubmitStatus('');
      // API呼び出しのシミュレーション
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      setSubmitStatus('フォームの送信に成功しました！');
      reset(); // 成功時にフォームリセット
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('送信中にエラーが発生しました');
    }
  };

  return (
    <YStack space="$4" width="100%">
      {/* 名前フィールド */}
      <YStack space="$2">
        <Label htmlFor="name">名前</Label>
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Input
                id="name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="山田太郎"
                borderColor={error ? '$red10' : '$borderColor'}
              />
              {error && (
                <Text color="$red10" fontSize="$2">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </YStack>

      {/* メールアドレスフィールド */}
      <YStack space="$2">
        <Label htmlFor="email">メールアドレス</Label>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Input
                id="email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="example@email.com"
                keyboardType="default"
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                borderColor={error ? '$red10' : '$borderColor'}
              />
              {error && (
                <Text color="$red10" fontSize="$2">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </YStack>

      {/* 年齢フィールド */}
      <YStack space="$2">
        <Label htmlFor="age">年齢</Label>
        <Controller
          control={control}
          name="age"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <Input
                id="age"
                value={value?.toString() || ''}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  onChange(isNaN(num) ? undefined : num);
                }}
                onBlur={onBlur}
                placeholder="25"
                keyboardType="numeric"
                borderColor={error ? '$red10' : '$borderColor'}
              />
              {error && (
                <Text color="$red10" fontSize="$2">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </YStack>

      {/* メッセージフィールド */}
      <YStack space="$2">
        <Label htmlFor="message">メッセージ</Label>
        <Controller
          control={control}
          name="message"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextArea
                id="message"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="こちらにメッセージを入力してください..."
                numberOfLines={4}
                borderColor={error ? '$red10' : '$borderColor'}
              />
              {error && (
                <Text color="$red10" fontSize="$2">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </YStack>

      {/* 利用規約スイッチ */}
      <YStack space="$2">
        <Controller
          control={control}
          name="agreed"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <YStack space="$2">
              <XStack space="$3" alignItems="center">
                <Switch value={value} onValueChange={onChange} />
                <Text>利用規約に同意します</Text>
              </XStack>
              {error && (
                <Text color="$red10" fontSize="$2">
                  {error.message}
                </Text>
              )}
            </YStack>
          )}
        />
      </YStack>

      {/* 送信ボタン */}
      <Button
        size="$4"
        theme="blue"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        opacity={isSubmitting ? 0.5 : 1}
      >
        {isSubmitting ? '送信中...' : '送信'}
      </Button>

      {/* 送信ステータスメッセージ */}
      {submitStatus && (
        <Text
          color={submitStatus.includes('成功') ? '$green10' : '$red10'}
          textAlign="center"
          fontSize="$3"
          fontWeight="bold"
        >
          {submitStatus}
        </Text>
      )}
    </YStack>
  );
}
