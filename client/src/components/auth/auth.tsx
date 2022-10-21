import { useAppSelector } from '../../store/store';
import { Login } from './login';
import { SignOut } from './signOut';
import { SignUp } from './signUp';

export const Auth = () => {
  const { loggedIn, details } = useAppSelector(({ auth }) => auth);

  return loggedIn ? (
    <>
      <SignOut />
      {details?.name}
    </>
  ) : (
    <>
      <SignUp />
      <Login />
    </>
  );
};
