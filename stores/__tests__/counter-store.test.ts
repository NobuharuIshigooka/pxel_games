/**
 * Zustand カウンターストアのサンプルテスト
 *
 * Zustand ストアは Reactコンポーネント外で getState() / setState() を使って
 * 直接テストできるため、act() ラップや render() は不要。
 */
import { useCounterStore } from '@/stores/counter-store';

// 各テスト前にストアを初期状態にリセット
beforeEach(() => {
  useCounterStore.setState({ count: 0 });
});

describe('useCounterStore', () => {
  it('countの初期値は0である', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('increment: countを1増加させる', () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('increment: 複数回呼び出すと累積される', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(3);
  });

  it('decrement: countを1減少させる', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('decrement: 0以下にも減少できる（下限なし）', () => {
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(-1);
  });

  it('reset: countを0に戻す', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('incrementByAmount: 指定した量だけcountを増加させる', () => {
    useCounterStore.getState().incrementByAmount(5);
    expect(useCounterStore.getState().count).toBe(5);
  });

  it('incrementByAmount: 負の値を指定するとcountを減少させる', () => {
    useCounterStore.getState().incrementByAmount(-3);
    expect(useCounterStore.getState().count).toBe(-3);
  });
});
