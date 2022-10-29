import { Layout } from '../../components/atoms/layout';
import { SignIn } from '../../components/auth/signIn';
import { SignUp } from '../../components/auth/signUp';

export default function AuthScreen() {
  return (
    <Layout>
      <SignIn />
      <SignUp />
    </Layout>
  );
}
