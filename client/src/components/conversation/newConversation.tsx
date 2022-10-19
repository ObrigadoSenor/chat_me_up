import { gql, useMutation } from '@apollo/client';
import { includes, reject } from 'ramda';
import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { Users } from '../users';

const ADD_CONVERSATION = gql`
  mutation addConversation($name: String!, $membersIds: [String!]!, $_userId: String!) {
    addConversation(name: $name, membersIds: $membersIds, _userId: $_userId) {
      _id
      name
      _membersId
      _messagesId
    }
  }
`;

export const NewConversation = () => {
  const { details } = useAppSelector(({ auth }) => auth);
  const [name, setName] = useState<string>('');
  const [membersIds, setMembersIds] = useState<string[]>([]);

  const [createConversation] = useMutation(ADD_CONVERSATION);
  const handleSend = async () => {
    await createConversation({ variables: { name, membersIds, _userId: details?._id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const toggleMemberId = (_userId: string) => {
    setMembersIds((prev) =>
      includes(_userId, prev) ? [...reject((pre) => pre === _userId, prev)] : [...prev, _userId],
    );
  };

  return (
    <div>
      <input type="text" defaultValue={name} onBlur={(e) => setName(e.target.value)}></input>
      <Users toogleUserInConversation={(props) => toggleMemberId(props)} />
      <button onClick={() => handleSend()}>Create conversation</button>
    </div>
  );
};
