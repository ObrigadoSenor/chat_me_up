import { ApolloError } from '@apollo/client';
import { Text } from './text';
interface ErrorProps {
  error: ApolloError;
}
export const Error = ({ error }: ErrorProps) => {
  const { message } = error || {};
  return <Text>{message}</Text>;
};
