import { useAppSelector } from '../../store/store';
import { Login } from './login';
import { SignOut } from './signOut';
import { SignUp } from './signUp';

export const Auth = () => {
  const { loggedIn } = useAppSelector(({ auth }) => auth);

  return loggedIn ? (
    <SignOut />
  ) : (
    <>
      <SignUp />
      <Login />
    </>
  );
};
