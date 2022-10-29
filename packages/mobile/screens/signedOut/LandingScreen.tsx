import { Button } from '../../components/atoms/button';
import { Layout } from '../../components/atoms/layout';

import { useTheme } from '../../hooks/useTheme';
import { setTheme } from '../../store/slices/system';

export default function LandingScreen() {
  const { themeType, dispatch } = useTheme();

  return (
    <Layout>
      <Button onPress={() => dispatch(setTheme(themeType === 'dark' ? 'light' : 'dark'))} title={themeType} />
    </Layout>
  );
}
