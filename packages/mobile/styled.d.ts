import 'styled-components';
import { SharedThemeProps } from '@chat_me_up/shared/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends SharedThemeProps {}
}
