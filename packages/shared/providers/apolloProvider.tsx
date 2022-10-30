import { ApolloClient, ApolloProvider as ApProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { ReactNode } from 'react';
import { AUTH_QUERIES } from '../queries/authQueries';
import { CONVERSATIONS_QUERIES } from '../queries/conversationQueries';
import { FRIENDS_QUERIES } from '../queries/friendsQueries';
import { MEMBERS_QUERIES } from '../queries/membersQueries';
import { MESSAGES_QUERIES } from '../queries/messagesQueries';
import { USER_QUERIES } from '../queries/userQueries';

const path = 'localhost:9000';
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
      },
    },
  },
});

const typeDefs = [
  ...CONVERSATIONS_QUERIES,
  ...MEMBERS_QUERIES,
  ...MESSAGES_QUERIES,
  ...USER_QUERIES,
  ...FRIENDS_QUERIES,
  ...AUTH_QUERIES,
];

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
});

export const ApolloProvider = ({ children }: ApolloProviderProps) => (
  <ApProvider client={client}>{children}</ApProvider>
);
