import { gql } from '@apollo/client';

/* QUERIES */
export const GET_USER = gql`
  query getUser($_id: String!) {
    getUser(_id: $_id) {
      _id
      name
      email
    }
  }
`;

/* MUTATIONS */

/* SUBSCRIPTIONS */

export const USER_QUERIES = [GET_USER];
