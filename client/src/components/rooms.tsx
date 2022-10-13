import { gql, useMutation, useQuery } from '@apollo/client';
import { compose, filter, not, propEq } from 'ramda';
import { useEffect, useState } from 'react';
import { RoomType } from '../../__generated_types__/types';
import { Room } from './room';

const GET_ROOMS = gql`
  query getRooms {
    getRooms {
      _id
      name
      membersId
      messagesId
    }
  }
`;

const SEND_ROOM = gql`
  mutation sendRoom($name: String!) {
    sendRoom(name: $name) {
      _id
      name
      membersId
      messagesId
    }
  }
`;

const ROOMS_SUBSCRIPTION = gql`
  subscription OnNewRoom {
    roomSent {
      _id
      name
      membersId
      messagesId
    }
  }
`;

const ROOMS_DELETE_SUBSCRIPTION = gql`
  subscription OnDeleteRoom {
    roomDeleted {
      _id
      name
      membersId
      messagesId
    }
  }
`;

export const Rooms = () => {
  const [name, setName] = useState<string>('');
  const [enterRoomId, setEnterRoomId] = useState<RoomType['_id'] | null>(null);

  const { loading, error, data, subscribeToMore } = useQuery(GET_ROOMS);

  const [createRoom] = useMutation(SEND_ROOM);

  useEffect(() => {
    const unsubFromAdd = subscribeToMore({
      document: ROOMS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};
        if (!data) return prev;
        const { roomSent } = data;
        return {
          getRooms: [...prev.getRooms, roomSent],
        };
      },
    });
    const unsubFromDelete = subscribeToMore({
      document: ROOMS_DELETE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};
        if (!data) return prev;
        const { roomDeleted } = data;
        const keppedRooms = filter(compose(not, propEq('_id', roomDeleted?._id)), prev.getRooms || []);
        const removed = keppedRooms.length !== prev.getRooms.length;
        removed && setEnterRoomId(null);
        return {
          getRooms: removed ? keppedRooms : prev.getRooms,
        };
      },
    });
    return () => {
      unsubFromAdd();
      unsubFromDelete();
    };
  }, []);

  const handleSend = async () => {
    await createRoom({ variables: { name } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      <div>
        <input type="text" id="name" defaultValue={name} onBlur={(e) => setName(e.target.value)}></input>
        <button onClick={() => handleSend()}>Create room</button>
      </div>
      {data.getRooms.map(({ _id, name }: RoomType) => {
        return (
          <div key={_id}>
            <button onClick={() => setEnterRoomId(_id)}>{name}</button>
          </div>
        );
      })}
      {enterRoomId && <Room _id={enterRoomId} />}
    </div>
  );
};
