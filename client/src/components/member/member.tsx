import styled from 'styled-components';
import { MemberType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';

const MemberContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  margin: 0;
  border: 1px solid rgba(200, 200, 200, 0.85);
`;

const Text = styled.span``;

interface MemberProps extends MemberType {}

export const Member = ({ _userId }: MemberProps) => {
  const { name } = useUser(_userId);
  return (
    <MemberContainer>
      <Text>{name}</Text>
    </MemberContainer>
  );
};
