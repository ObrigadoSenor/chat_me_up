import { store } from '../store';
import { decrement, increment, incrementByAmount } from './template';

describe('Template slice', () => {
  const { dispatch, getState } = store;
  const { value } = getState().template;

  test('should increment on action call', () => {
    dispatch(increment());
    expect(getState().template.value).toBe(value + 1);
  });
  test('should decrement on action call', () => {
    dispatch(decrement());
    expect(getState().template.value).toBe(value);
  });
  test('should increment by amount on action call', () => {
    const amount = 10;
    dispatch(incrementByAmount(amount));
    expect(getState().template.value).toBe(value + amount);
  });
});
