import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { MemberType, RoomType, UserType } from '../../__generated_types__/types';
import { User } from './user';
import { compose, filter, not, propEq } from 'ramda';

const GET_MEMBERS = gql`
  query getMembers($_id: String!) {
    getMembers(_id: $_id) {
      _id
      _userId
    }
  }
`;

const ADD_MEMBER = gql`
  mutation addMember($_id: String!, $_userId: String!) {
    addMember(_id: $_id, _userId: $_userId) {
      _id
      _userId
    }
  }
`;

const REMOVE_MEMBER = gql`
  mutation removeMember($_id: String!, $_userId: String!) {
    removeMember(_id: $_id, _userId: $_userId) {
      _id
      _userId
    }
  }
`;

const MEMBER_ADD_SUBSCRIPTION = gql`
  subscription OnNewMember {
    memberAdded {
      _id
      _userId
    }
  }
`;

const MEMBER_REMOVE_SUBSCRIPTION = gql`
  subscription OnRemoveMember {
    memberRemoved {
      _id
      _userId
    }
  }
`;

interface MembersProps extends Pick<RoomType, '_id'> {}

export const Members = ({ _id }: MembersProps) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_MEMBERS, { variables: { _id } });
  const [addMember] = useMutation(ADD_MEMBER);
  const [removeMember] = useMutation(REMOVE_MEMBER);

  useEffect(() => {
    const unsubFromAdd = subscribeToMore({
      document: MEMBER_ADD_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData = {} }) => {
        const { data } = subscriptionData;

        if (!data) return prev;
        const { memberAdded } = data || {};
        const { getMembers = [] } = prev || {};
        return {
          getMembers: [...getMembers, memberAdded],
        };
      },
    });
    const unsubFromDelete = subscribeToMore({
      document: MEMBER_REMOVE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData || {};

        if (!data) return prev;

        const { memberRemoved } = data;
        const { getMembers = [] } = prev || {};
        const keppedMembers = filter(compose(not, propEq('_id', memberRemoved?._id)), getMembers);
        const removed = keppedMembers.length !== getMembers.length;
        return {
          getMembers: removed ? keppedMembers : getMembers,
        };
      },
    });
    return () => {
      unsubFromAdd();
      unsubFromDelete();
    };
  }, [_id]);

  const handleAdd = async (_userId: UserType['_id']) => {
    await addMember({ variables: { _id, _userId } });
  };

  const handleRemove = async (_userId: UserType['_id']) => {
    const a = await removeMember({ variables: { _id, _userId } });
    console.log('a', a);
  };

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  const { getMembers = [] } = data || {};
  return (
    <div>
      <User addUserToRoom={(_userId) => handleAdd(_userId)} removeUserFromRoom={(_userId) => handleRemove(_userId)} />
      <button onClick={() => handleAdd('')}>Add member</button>
      {getMembers.map(({ _id, _userId }: MemberType) => (
        <div key={_userId}>
          <p>
            {_id}: {_userId}
          </p>
        </div>
      ))}
    </div>
  );
};
