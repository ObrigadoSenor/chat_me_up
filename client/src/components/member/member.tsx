import { MemberType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';

interface MemberProps extends MemberType {}

export const Member = ({ _userId }: MemberProps) => {
  const { name } = useUser(_userId);
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};
