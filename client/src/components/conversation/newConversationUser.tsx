import { FriendType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';

interface NewConversationUserProps extends FriendType {
  toggleMemberId: (_userId: string) => void;
}

export const NewConversationUser = ({ _id, _userId, toggleMemberId }: NewConversationUserProps) => {
  const user = useUser(_userId);

  return (
    <div>
      {user.name}
      <input type="checkbox" onChange={() => toggleMemberId(_userId)} />
    </div>
  );
};
