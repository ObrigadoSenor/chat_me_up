import { MemberType } from '@chat_me_up/shared/generated/serverTypes';
import { useUser } from '@chat_me_up/shared/hooks/useUser';
import { IconProps } from '../../atoms/icon';
import { Text } from '../../atoms/text';

interface MemberProps extends Partial<Pick<MemberType, '_userId'>> {
  icon: IconProps;
  text?: string;
}

export const Member = ({ _userId = '', text, icon }: MemberProps) => {
  const { name } = useUser(_userId);
  return (
    <Text border={true} width="100%" icons={{ start: { ...icon } }}>
      {text || name}
    </Text>
  );
};
