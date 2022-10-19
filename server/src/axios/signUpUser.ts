import { UserAddType, UserBasicType } from "../entities/user";
import axios from "axios";
import { env } from "process";
import { print } from "graphql";
import gql from "graphql-tag";

const SIGN_UP_USER = gql`
  mutation signUpUser(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUpUser(
      name: $name
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
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
      }
    }
  }
`;

export const signUpUser = async (props: Omit<UserAddType, "_id">) => {
  const endpoint = env.AUTH_SERVER_URI || "";

  const user = await axios
    .post(endpoint, {
      query: print(SIGN_UP_USER),
      variables: props,
    })
    .then(({ data }) => data?.data?.signUpUser?.node?.user)
    .catch((err) => err);

  return user as UserBasicType;
};
