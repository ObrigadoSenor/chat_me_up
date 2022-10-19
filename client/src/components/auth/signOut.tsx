/* eslint-disable no-undef */
import { signOut } from '../../store/slices/auth';
import { useAppDispatch } from '../../store/store';

export const SignOut = () => {
  const disaptch = useAppDispatch();

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          disaptch(signOut());
        }}
      >
        Sign out
      </button>
    </div>
  );
};
