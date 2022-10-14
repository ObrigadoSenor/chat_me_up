import { store } from '../store';
import { setRoomId } from './room';

describe('Room slice', () => {
  const { dispatch, getState } = store;

  test('should set room id on action call', () => {
    dispatch(setRoomId('test'));
    expect(getState().room.enteredRoomId).toBe('test');
  });
});
