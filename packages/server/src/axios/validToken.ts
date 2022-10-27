import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";
import { env } from "process";
import { UserType, ValidTokenType } from "../entities/user";

const VALID_TOKEN = gql`
  query validToken($token: String!) {
    validToken(token: $token) {
      node {
        expired
      }
    }
  }
`;

export const validToken = async (props: Pick<UserType, "token">) => {
  const endpoint = env.AUTH_SERVER_URI || "";

  const valid = await axios
    .post(endpoint, {
      query: print(VALID_TOKEN),
      variables: props,
    })
    .then(({ data }) => data?.data?.validToken?.node)
    .catch((err) => err);

  return valid as ValidTokenType;
};
