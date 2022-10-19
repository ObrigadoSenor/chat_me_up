/* eslint-disable no-undef */
import { gql, useQuery } from '@apollo/client';
import { ReactNode } from 'react';
import { setUser } from '../store/slices/auth';
import { useAppDispatch } from '../store/store';

interface AuthProviderProps {
  children: ReactNode;
}

const GET_USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      _id
      name
      email
      token
    }
  }
`;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const disaptch = useAppDispatch();
  const token = localStorage.getItem('token') || '""';

  const { loading, error, data } = useQuery(GET_USER_BY_TOKEN, {
    variables: {
      token: JSON.parse(token),
    },
  });
  if (loading) return <>LOADING</>;
  disaptch(setUser(data?.getUserByToken ? { ...data.getUserByToken } : null));
  return <>{children}</>;
};
