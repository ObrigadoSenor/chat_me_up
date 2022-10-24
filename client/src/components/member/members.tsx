import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose, filter, isEmpty, not, propEq } from 'ramda';
import { useMemo } from 'react';
import styled from 'styled-components';
import { MemberType, Query, Subscription, UserType } from '../../../__generated_types__/types';
import { useAppSelector } from '../../store/store';
import { Member } from './member';

const GET_MEMBERS = gql`
  query getMembers($_conversationId: String!) {
    getMembers(_conversationId: $_conversationId) {
      _id
      _userId
    }
  }
`;

const ADD_MEMBER = gql`
  mutation addMember($_conversationId: String!, $_userId: String!) {
    addMember(_conversationId: $_conversationId, _userId: $_userId) {
      _id
      _userId
    }
  }
`;

const REMOVE_MEMBER = gql`
  mutation removeMember($_conversationId: String!, $_userId: String!) {
    removeMember(_conversationId: $_conversationId, _userId: $_userId) {
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

const MembersContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  overflow-x: auto;
  margin: 0 0.5rem;
  padding: 0 0.5rem;
  width: 100%;

  & > li:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

export const Members = () => {
  const { enteredConversationId: _conversationId } = useAppSelector(({ conversation }) => conversation);
  const {
    loading,
    error,
    data: initData,
  } = useQuery<{ getMembers: Query['getMembers'] }>(GET_MEMBERS, { variables: { _conversationId } });
  const { getMembers = [] } = initData || {};

  const { data: friendAddData } = useSubscription<{ memberAdded: Subscription['memberAdded'] }>(
    MEMBER_ADD_SUBSCRIPTION,
  );

  const { memberAdded = {} as MemberType } = friendAddData || {};

  const { data: friendRemoveData } = useSubscription<{ memberRemoved: Subscription['memberRemoved'] }>(
    MEMBER_REMOVE_SUBSCRIPTION,
  );
  const { memberRemoved } = friendRemoveData || {};

  const keppedMembers = filter(compose(not, propEq('_id', memberRemoved?._id)), getMembers);
  const removed = keppedMembers.length !== getMembers.length;
  const members = useMemo(
    () => (removed || isEmpty(memberAdded) ? keppedMembers : [...getMembers, memberAdded]),
    [removed, keppedMembers, getMembers, memberAdded],
  );
  const [addMember] = useMutation(ADD_MEMBER);
  const [removeMember] = useMutation(REMOVE_MEMBER);

  // useEffect(() => {
  //   const unsubFromAdd = subscribeToMore({
  //     document: MEMBER_ADD_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData = {} }) => {
  //       const { data } = subscriptionData;
  //       if (!data) return prev;
  //       const { memberAdded } = data || {};
  //       const { getMembers = [] } = prev || {};
  //       return {
  //         getMembers: [...getMembers, memberAdded],
  //       };
  //     },
  //   });
  //   const unsubFromDelete = subscribeToMore({
  //     document: MEMBER_REMOVE_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       const { data } = subscriptionData || {};

  //       if (!data) return prev;

  //       const { memberRemoved } = data;
  //       const { getMembers = [] } = prev || {};

  //       const keppedMembers = filter(compose(not, propEq('_id', memberRemoved?._id)), getMembers);
  //       const removed = keppedMembers.length !== getMembers.length;
  //       return {
  //         getMembers: removed ? keppedMembers : getMembers,
  //       };
  //     },
  //   });
  //   return () => {
  //     unsubFromAdd();
  //     unsubFromDelete();
  //   };
  // }, []);

  const handleAdd = async (_userId: UserType['_id']) => {
    return await addMember({ variables: { _conversationId, _userId } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const handleRemove = async (_userId: UserType['_id']) => {
    return await removeMember({ variables: { _conversationId, _userId } })
      .then(() => {})
      .catch((err) => console.log('err', err));
  };

  const memoMembers = useMemo(
    () => members.map((props: MemberType) => <Member key={props._id} {...props} />),
    [members],
  );

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <MembersContainer>
      <FontAwesomeIcon icon="users-gear" />
      {memoMembers}
    </MembersContainer>
  );
};
