import { gql, useMutation, useQuery } from '@apollo/client';
import { useAppSelector } from '../../store/store';
import { Members } from '../member/members';
import { Messages } from '../message/messages';
import { SendMessage } from '../message/sendMessage';

const JOIN_CONVERSATION = gql`
  query joinConversation($_conversationId: String!) {
    joinConversation(_conversationId: $_conversationId) {
      _id
      name
    }
  }
`;

const DELETE_CONVERSATION = gql`
  mutation deleteConversation($_conversationId: String!) {
    deleteConversation(_conversationId: $_conversationId) {
      _id
      name
    }
  }
`;

const Conversation = () => {
  const { enteredConversationId: _conversationId } = useAppSelector(({ conversation }) => conversation);

  const { loading, error, data } = useQuery(JOIN_CONVERSATION, { variables: { _conversationId } });
  const [deleteConversation] = useMutation(DELETE_CONVERSATION);

  const handleDelete = async () => {
    await deleteConversation({ variables: { _conversationId } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      <h4>{data?.joinConversation?.name}</h4>
      <button onClick={() => handleDelete()}>Delete</button>
      <Members />
      <SendMessage />
      <Messages />
    </div>
  );
};

export default Conversation;
