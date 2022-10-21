import { ApolloClient, ApolloProvider as ApProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { ReactNode } from 'react';

const path = `localhost:${process.env.REACT_APP_SERVER_PORT}`;
const httpGQLPath = `http://${path}/graphql`;

interface ApolloProviderProps {
  children: ReactNode;
}

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${path}/subscriptions`,
  }),
);

const httpLink = new HttpLink({
  uri: httpGQLPath,
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getFriends: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // getFriendsNode: {
        //   merge: true,
        // },
      },
    },
  },
});

const client = new ApolloClient({
  link,
  cache,
});

export const ApolloProvider = ({ children }: ApolloProviderProps) => (
  <ApProvider client={client}>{children}</ApProvider>
);
