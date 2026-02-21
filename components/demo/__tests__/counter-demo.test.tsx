/**
 * CounterDemo コンポーネントのサンプルテスト
 *
 * Tamagui コンポーネントを含むため TamaguiProvider でラップして
 * テーマトークン（$blue10 など）を正しく解決する。
 */
import { fireEvent, render, screen } from '@testing-library/react-native';
import { TamaguiProvider } from 'tamagui';

import { CounterDemo } from '@/components/demo/counter-demo';
import { useCounterStore } from '@/stores';
import tamaguiConfig from '@/tamagui.config';

// Tamagui コンポーネントのレンダリングに必要な Provider
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
    {children}
  </TamaguiProvider>
);

// 各テスト前に Zustand ストアをリセット
beforeEach(() => {
  useCounterStore.setState({ count: 0 });
});

describe('CounterDemo', () => {
  it('初期状態でcount 0を表示する', () => {
    render(<CounterDemo />, { wrapper });
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('タイトル「カウンターデモ」が表示される', () => {
    render(<CounterDemo />, { wrapper });
    expect(screen.getByText('カウンターデモ')).toBeTruthy();
  });

  it('+1ボタンを押すとカウントが1増加する', () => {
    render(<CounterDemo />, { wrapper });
    fireEvent.press(screen.getByText('+1'));
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('-1ボタンを押すとカウントが1減少する', () => {
    useCounterStore.setState({ count: 1 });
    render(<CounterDemo />, { wrapper });
    fireEvent.press(screen.getByText('-1'));
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('リセットボタンを押すとカウントが0に戻る', () => {
    useCounterStore.setState({ count: 5 });
    render(<CounterDemo />, { wrapper });
    fireEvent.press(screen.getByText('リセット'));
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('+5ボタンを押すとカウントが5増加する', () => {
    render(<CounterDemo />, { wrapper });
    fireEvent.press(screen.getByText('+5'));
    expect(screen.getByText('5')).toBeTruthy();
  });
});
