import { useMutation } from '@apollo/client';
import { ConversationType } from '@chat_me_up/shared/generated/serverTypes';
import { SEND_MESSAGE } from '@chat_me_up/shared/queries/messagesQueries';
import { Input } from '../../atoms/input';

interface SendMessageProps extends Pick<ConversationType, '_id'> {}

const SendMessage = ({ _id }: SendMessageProps) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = (message?: string) => {
    if (!message) return null;
    sendMessage({ variables: { _userId: '6351ad14b665f50d8f39ecc8', message, _conversationId: _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  return <Input placeholder="New message" icons={{ end: { name: 'send', onPress: (value) => handleSend(value) } }} />;
};

export default SendMessage;
