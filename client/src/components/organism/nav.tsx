import styled from 'styled-components';
import { Auth } from '../auth/auth';

const Navigation = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 70px;
  width: 100%;
`;

const Nav = () => {
  return (
    <Navigation>
      <Auth />
    </Navigation>
  );
};

export default Nav;
