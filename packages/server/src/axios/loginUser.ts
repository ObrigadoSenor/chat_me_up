import { UserAddType, UserBasicType } from '../entities/user';
import axios from 'axios';
import { env } from 'process';
import { print } from 'graphql';
import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation signUpUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      node {
        user {
          _id
          name
          email
        }
        errors {
          confirmPassword
          password
          name
          email
        }
        token
      }
    }
  }
`;

export const loginUser = async (props: Pick<UserAddType, 'email' | 'password'>) => {
  const endpoint = env.AUTH_SERVER_URI || '';

  const user = await axios
    .post(endpoint, {
      query: print(LOGIN_USER),
      variables: props,
    })
    .then(({ data }) => {
      return {
        ...data?.data?.loginUser?.node?.user,
        token: data?.data?.loginUser?.node?.token,
      };
    })
    .catch((err) => err);

  return user as UserBasicType;
};
