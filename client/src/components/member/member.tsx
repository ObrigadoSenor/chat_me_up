import { MemberType } from '../../../__generated_types__/types';
import { useUserData } from '../../hooks/useUserData';

interface MemberProps extends MemberType {}

export const Member = ({ _userId }: MemberProps) => {
  const { name } = useUserData(_userId);
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};
