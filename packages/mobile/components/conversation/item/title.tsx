import styled from 'styled-components/native';
import { useUser } from '@chat_me_up/shared/hooks/useUser';
import { UserType } from '@chat_me_up/shared/generated/serverTypes';
import { Text } from '../../atoms/text';

const TitleContainer = styled.View`
  &:not(:last-of-type):after {
    content: '\\0026';
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

interface ConversationsTitleProps {
  _userId: UserType['_id'];
}

export const Title = ({ _userId }: ConversationsTitleProps) => {
  const { name } = useUser(_userId);

  return (
    <TitleContainer>
      <Text size="l">{name}</Text>
    </TitleContainer>
  );
};
