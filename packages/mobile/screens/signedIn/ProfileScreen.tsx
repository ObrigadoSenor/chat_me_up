import { Button } from '../../components/atoms/button';

import { Layout } from '../../components/atoms/layout';
import { useTheme } from '../../hooks/useTheme';
import { signOut } from '../../store/slices/auth';
import { setTheme } from '../../store/slices/system';
import { useAppDispatch } from '../../store/store';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { themeType } = useTheme();
  return (
    <Layout>
      <Button title="Sign out" onPress={() => dispatch(signOut())} />
      <Button onPress={() => dispatch(setTheme(themeType === 'dark' ? 'light' : 'dark'))} title={themeType} />
    </Layout>
  );
}
