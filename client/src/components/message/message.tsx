import { MessageType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';

interface MessageProps extends MessageType {}

export const Message = ({ _userId, message }: MessageProps) => {
  const { name } = useUser(_userId);

  return (
    <div>
      <p>
        {name}: {message}
      </p>
    </div>
  );
};
