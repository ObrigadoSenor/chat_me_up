import styled from 'styled-components/native';
import { Input } from '../atoms/input';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const InputContainer = styled.View`
  padding: 0 20px;
  flex: 0.9;
  justify-content: center;
`;

export const SwitchAuthContainer = styled.View`
  padding: 0 20px;
  flex: 0.1;
  justify-content: center;
`;

export const Inp = styled(Input)`
  margin-bottom: 20px;
`;
