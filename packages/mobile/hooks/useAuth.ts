import { useQuery } from '@apollo/client';
import { UserType } from '@chat_me_up/shared/generated/serverTypes';
import { GET_USER_BY_TOKEN } from '@chat_me_up/shared/queries/authQueries';
import { getItemAsync } from 'expo-secure-store';
import { useEffect } from 'react';
import { setUser, setUserToken } from '../store/slices/auth';
import { useAppDispatch, useAppSelector } from '../store/store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { userToken, signedIn } = useAppSelector(({ auth }) => auth);
  const { loading, error, data } = useQuery<{ getUserByToken: UserType }>(GET_USER_BY_TOKEN, {
    variables: {
      token: userToken,
    },
  });
  const { getUserByToken } = data || {};

  useEffect(() => {
    if (getUserByToken) {
      dispatch(setUser(getUserByToken));
    }
  }, [getUserByToken]);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await getItemAsync('userToken');
      dispatch(setUserToken(userToken));
    };
    getToken();
  }, []);
  return { signedIn, loading, error };
};
