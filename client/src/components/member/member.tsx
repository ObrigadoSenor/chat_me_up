import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { MemberType } from '../../../__generated_types__/types';
import { useUser } from '../../hooks/useUser';

const MemberContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.5rem;
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  &:not(:last-of-type) > span {
    border-bottom: 1px solid rgba(240, 240, 240, 0.1);
  }
`;

const Text = styled.span`
  margin-left: 1rem;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 0.85rem;
`;

interface MemberProps extends Partial<Pick<MemberType, '_userId'>> {
  icon: IconProp;
  text?: string;
  onIconClick?: () => void;
}

export const Member = ({ _userId = '', text, icon, onIconClick }: MemberProps) => {
  const { name } = useUser(_userId);
  return (
    <MemberContainer>
      <FontAwesomeIcon icon={icon} onClick={() => (onIconClick ? onIconClick() : {})} />
      <Text>{text || name}</Text>
    </MemberContainer>
  );
};
