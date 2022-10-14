import { useQuery } from '@apollo/client';
import { UserBasicType, UserType } from '../../__generated_types__/types';
import { GET_USER } from './user';

export const OneUser = ({ _id }: Pick<UserType, '_id'>) => {
  const { loading, error, data } = useQuery<{ getUser: UserBasicType }>(GET_USER, { variables: { _id } });

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;
  if (!data) return <p>No Data</p>;

  const { getUser } = data;

  return (
    <div>
      <p>{getUser.name}</p>
      <p>{getUser.email}</p>
    </div>
  );
};
