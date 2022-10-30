import { useConversations } from '@chat_me_up/shared/hooks/useConversations';
import { useMemo } from 'react';
import { Error } from '../../components/atoms/error';
import { Layout } from '../../components/atoms/layout';
import { Spinner } from '../../components/atoms/spinner';
import Item from '../../components/conversation/item/item';
import { useAppSelector } from '../../store/store';

export default function ConversationsScreen() {
  const { user } = useAppSelector(({ auth }) => auth);

  const { conversations, loading, error } = useConversations({ _userId: user?._id });
  const renderConversations = useMemo(
    () => conversations.map((props) => <Item key={props._id} {...props} />),
    [conversations],
  );
  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return <Layout>{renderConversations}</Layout>;
}
