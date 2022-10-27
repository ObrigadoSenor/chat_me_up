import { MemberType } from '@chat_me_up/shared/generated/serverTypes';
import { useUser } from '@chat_me_up/shared/hooks/useUser';
import styled from 'styled-components/native';
import { IconProps } from '../../atoms/icon';
import { Text } from '../../atoms/text';

const MemberContainer = styled.View`
  display: flex;
  box-sizing: border-box;
  width: 100%;
`;

interface MemberProps extends Partial<Pick<MemberType, '_userId'>> {
  icon: IconProps;
  text?: string;
}

export const Member = ({ _userId = '', text, icon }: MemberProps) => {
  const { name } = useUser(_userId);
  return (
    <MemberContainer>
      <Text border={true} icons={{ start: { ...icon } }}>
        {text || name}
      </Text>
    </MemberContainer>
  );
};
