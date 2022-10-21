import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Auth } from '../auth/auth';

const Navigation = styled.nav`
  position: absolute;
  top: 0;
  left: 4rem;
  right: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
`;

const NavUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavList = styled.li`
  display: flex;
  &:not(:first-of-type) {
    margin-left: 2rem;
  }
`;

const AuthList = styled.li`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const renderLink = (to: string, label: string) => (
  <NavList>
    <Link to={to}>{label}</Link>
  </NavList>
);

const Nav = () => {
  return (
    <Navigation>
      <NavUl>
        {renderLink('/friends', 'Friends')}
        {renderLink('/conversation', 'Conversation')}
        <AuthList>
          <Auth />
        </AuthList>
      </NavUl>
    </Navigation>
  );
};

export default Nav;
