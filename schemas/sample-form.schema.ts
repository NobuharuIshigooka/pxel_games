import { z } from 'zod';

/**
 * サンプルフォームのバリデーションスキーマ
 * 各種バリデーションパターンの参考例として実装
 */
export const sampleFormSchema = z.object({
  // 基本的な文字列バリデーション
  name: z
    .string()
    .min(2, '名前は2文字以上必要です')
    .max(50, '名前は50文字以内で入力してください'),

  // メールアドレスバリデーション
  email: z.string().email('有効なメールアドレスを入力してください'),

  // 数値バリデーション
  age: z
    .number({
      required_error: '年齢を入力してください',
      invalid_type_error: '有効な数値を入力してください',
    })
    .min(0, '年齢は0以上である必要があります')
    .max(150, '有効な年齢を入力してください'),

  // 長文テキストバリデーション
  message: z
    .string()
    .min(10, 'メッセージは10文字以上必要です')
    .max(500, 'メッセージは500文字以内で入力してください'),

  // スイッチ（boolean）バリデーション
  agreed: z.boolean().refine((val) => val === true, {
    message: '利用規約に同意する必要があります',
  }),
});

/**
 * サンプルフォームの型定義
 * zodスキーマから自動生成される型安全な型
 */
export type SampleFormData = z.infer<typeof sampleFormSchema>;
