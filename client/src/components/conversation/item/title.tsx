import styled from 'styled-components';
import { UserType } from '../../../../__generated_types__/types';
import { useUser } from '../../../hooks/useUser';

const TitleContainer = styled.li`
  &:not(:last-of-type):after {
    content: '\\0026';
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

const Text = styled.span`
  font-size: 0.85rem;
`;

interface ConversationsTitleProps {
  _userId: UserType['_id'];
}

export const Title = ({ _userId }: ConversationsTitleProps) => {
  const { name } = useUser(_userId);

  return (
    <TitleContainer>
      <Text>{name}</Text>
    </TitleContainer>
  );
};
