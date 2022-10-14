import { gql, useMutation, useQuery } from '@apollo/client';
import { RoomType } from '../../__generated_types__/types';
import { Members } from './members';
import { Messages } from './messages';
import { SendMessage } from './sendMessage';

const JOIN_ROOM = gql`
  query joinRoom($_id: String!) {
    joinRoom(_id: $_id) {
      _id
      name
      membersId
      messagesId
    }
  }
`;

const DELETE_ROOM = gql`
  mutation deleteRoom($_id: String!) {
    deleteRoom(_id: $_id) {
      _id
      name
      membersId
      messagesId
    }
  }
`;

interface RoomProps extends Pick<RoomType, '_id'> {}

export const Room = ({ _id }: RoomProps) => {
  const { loading, error, data } = useQuery(JOIN_ROOM, { variables: { _id } });
  const [deleteRoom] = useMutation(DELETE_ROOM);

  const handleDelete = async () => {
    await deleteRoom({ variables: { _id } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      <h4>{data?.joinRoom?.name}</h4>
      <button onClick={() => handleDelete()}>Delete</button>
      <Members _id={_id} />
      <SendMessage _id={_id} />
      <Messages _id={_id} />
    </div>
  );
};
