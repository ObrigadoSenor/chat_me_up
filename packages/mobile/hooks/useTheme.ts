import { getItemAsync } from 'expo-secure-store';
import { useEffect } from 'react';
import { setTheme, SystemStateProps } from '../store/slices/system';
import { useAppDispatch, useAppSelector } from '../store/store';
import { darkTheme, lightTheme } from '@chat_me_up/shared/styles/theme';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(({ system }) => system);

  useEffect(() => {
    const getTheme = async () => {
      const theme = ((await getItemAsync('theme')) || 'light') as SystemStateProps['theme'];
      dispatch(setTheme(theme));
    };
    getTheme();
  }, []);

  return { theme: theme === 'dark' ? darkTheme : lightTheme, themeType: theme, dispatch };
};
