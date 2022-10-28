import { Layout } from '../../components/atoms/layout';
import { SignIn } from '../../components/auth/signIn';
import { SignUp } from '../../components/auth/signUp';
import { RootTabScreenProps } from '../../types';

export default function AuthScreen(props: RootTabScreenProps<'Auth'>) {
  return (
    <Layout>
      <SignIn {...props} />
      <SignUp />
    </Layout>
  );
}
