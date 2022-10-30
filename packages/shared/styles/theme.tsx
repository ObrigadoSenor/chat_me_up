export interface SharedThemeSpacingProps {
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
}

export interface SharedThemeFontSizesProps extends SharedThemeSpacingProps {}
export interface SharedThemeBorderRadiusProps extends SharedThemeSpacingProps {}

export interface SharedThemeTextProps {
  primary: string;
  secondary: string;
  accent: string;
  disabled: string;
}

export interface SharedThemeBgProps {
  primary: string;
  secondary: string;
  accent: string;
  modal: string;
}

export interface SharedThemeProps {
  colors: {
    text: SharedThemeTextProps;
    bg: SharedThemeBgProps;
  };
  spacings: SharedThemeSpacingProps;
  fontSizes: SharedThemeFontSizesProps;
  borderRadius: SharedThemeBorderRadiusProps;
}

const spacings: SharedThemeSpacingProps = {
  xs: '5px',
  s: '10px',
  m: '15px',
  l: '20px',
  xl: '30px',
};

const fontSizes: SharedThemeFontSizesProps = {
  xs: '10px',
  s: '12px',
  m: '14px',
  l: '16px',
  xl: '20px',
};

const borderRadius: SharedThemeBorderRadiusProps = {
  xs: '3px',
  s: '6px',
  m: '9px',
  l: '12px',
  xl: '50%',
};

const defaultTheme: Pick<SharedThemeProps, 'fontSizes' | 'spacings' | 'borderRadius'> = {
  spacings,
  fontSizes,
  borderRadius,
};

const darkTheme: SharedThemeProps = {
  ...defaultTheme,
  colors: {
    text: {
      primary: '#fff',
      secondary: '#000',
      accent: '#FF888B',
      disabled: 'rgba(152, 152, 152, 0.5)',
    },
    bg: {
      primary: '#000',
      secondary: '#1e1e1e',
      accent: '#FF888B',
      modal: '#101010',
    },
  },
};
const lightTheme: SharedThemeProps = {
  ...defaultTheme,
  colors: {
    text: {
      primary: '#1e1e1e',
      secondary: '#d0cdcd',
      accent: '#FF888B',
      disabled: 'rgba(152, 152, 152, 0.5)',
    },
    bg: {
      primary: '#fff',
      secondary: '#dddddd',
      accent: '#FF888B',
      modal: '#fff',
    },
  },
};

export { lightTheme, darkTheme };
