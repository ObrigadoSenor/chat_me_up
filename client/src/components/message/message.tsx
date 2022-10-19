import { MessageType } from '../../../__generated_types__/types';
import { useUserData } from '../../hooks/useUserData';

interface MessageProps extends MessageType {}

export const Message = ({ _userId, message }: MessageProps) => {
  const { name } = useUserData(_userId);

  return (
    <div>
      <p>
        {name}: {message}
      </p>
    </div>
  );
};
