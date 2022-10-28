import { gql } from '@apollo/client';

/* QUERIES */
export const GET_USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      _id
      name
      email
      token
    }
  }
`;
/* MUTATIONS */
export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    addUser(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
      _id
      name
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      name
      email
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
      name
      email
    }
  }
`;

/* SUBSCRIPTIONS */

export const AUTH_QUERIES = [ADD_USER, LOGIN_USER, DELETE_USER, GET_USER_BY_TOKEN];
