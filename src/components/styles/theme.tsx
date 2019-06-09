import baseStyled, { ThemedStyledInterface } from 'styled-components';
// // https://github.com/styled-components/styled-components/issues/1589#issuecomment-435613664

export const lightTheme = {
  all: {
    borderRadius: '0.5rem',
  },
  main: {
    color: '#FAFAFA',
    textColor: '#212121',
    bodyColor: '#FFF',
  },
  secondary: {
    color: '#757575',
  },
};

// Force both themes to be consistent!
export const darkTheme: Theme = {
  // Make properties the same on both!
  all: { ...lightTheme.all },
  main: {
    color: '#212121',
    textColor: '#FAFAFA',
    bodyColor: '#424242',
  },
  secondary: {
    color: '#616161',
  },
};

export type Theme = typeof lightTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
