/**
 * Zod スキーマのサンプルテスト
 *
 * safeParse() でバリデーション結果を検証する純粋なユニットテスト。
 * Reactコンポーネントや外部依存が不要なため、最もシンプルに書ける。
 */
import {
  type SampleFormData,
  sampleFormSchema,
} from '@/schemas/sample-form.schema';

const validData: SampleFormData = {
  name: '山田太郎',
  email: 'yamada@example.com',
  age: 25,
  message: 'これはテスト用のメッセージです。10文字以上。',
  agreed: true,
};

describe('sampleFormSchema', () => {
  it('正しいデータはバリデーションを通過する', () => {
    expect(sampleFormSchema.safeParse(validData).success).toBe(true);
  });

  describe('name フィールド', () => {
    it('2文字未満の場合はエラーになる', () => {
      const result = sampleFormSchema.safeParse({ ...validData, name: 'A' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('名前は2文字以上必要です');
      }
    });

    it('51文字以上の場合はエラーになる', () => {
      const result = sampleFormSchema.safeParse({
        ...validData,
        name: 'あ'.repeat(51),
      });
      expect(result.success).toBe(false);
    });

    it('50文字はバリデーションを通過する', () => {
      const result = sampleFormSchema.safeParse({
        ...validData,
        name: 'あ'.repeat(50),
      });
      expect(result.success).toBe(true);
    });
  });

  describe('email フィールド', () => {
    it('無効なメールアドレスはエラーになる', () => {
      const result = sampleFormSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          '有効なメールアドレスを入力してください'
        );
      }
    });

    it('有効なメールアドレスはバリデーションを通過する', () => {
      expect(
        sampleFormSchema.safeParse({
          ...validData,
          email: 'test@example.co.jp',
        }).success
      ).toBe(true);
    });
  });

  describe('age フィールド', () => {
    it('0はバリデーションを通過する', () => {
      expect(sampleFormSchema.safeParse({ ...validData, age: 0 }).success).toBe(
        true
      );
    });

    it('150はバリデーションを通過する', () => {
      expect(
        sampleFormSchema.safeParse({ ...validData, age: 150 }).success
      ).toBe(true);
    });

    it('151以上はエラーになる', () => {
      expect(
        sampleFormSchema.safeParse({ ...validData, age: 151 }).success
      ).toBe(false);
    });

    it('負の値はエラーになる', () => {
      expect(
        sampleFormSchema.safeParse({ ...validData, age: -1 }).success
      ).toBe(false);
    });
  });

  describe('message フィールド', () => {
    it('10文字未満はエラーになる', () => {
      const result = sampleFormSchema.safeParse({
        ...validData,
        message: '短い',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'メッセージは10文字以上必要です'
        );
      }
    });
  });

  describe('agreed フィールド', () => {
    it('falseの場合はエラーになる', () => {
      const result = sampleFormSchema.safeParse({
        ...validData,
        agreed: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          '利用規約に同意する必要があります'
        );
      }
    });
  });
});
