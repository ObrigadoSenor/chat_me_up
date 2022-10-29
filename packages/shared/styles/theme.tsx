interface SharedThemeColorsProps {
  primary: string;
  secondary: string;
}

export interface SharedThemeTextProps extends SharedThemeColorsProps {
  accent: string;
  disabled: string;
}

export interface SharedThemeBgProps extends SharedThemeColorsProps {
  accent: string;
  modal: string;
}

export interface SharedThemeProps {
  colors: {
    text: SharedThemeTextProps;
    bg: SharedThemeBgProps;
  };
}

const darkTheme: SharedThemeProps = {
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
      modal: 'rgba(230, 230, 230, 1)',
    },
  },
};

export { lightTheme, darkTheme };
