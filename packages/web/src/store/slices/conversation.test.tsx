import { store } from '../store';
import { setConversationId } from './conversation';

describe('Room slice', () => {
  const { dispatch, getState } = store;

  test('should set conversation id on action call', () => {
    dispatch(setConversationId('test'));
    expect(getState().conversation.enteredConversationId).toBe('test');
  });
});
