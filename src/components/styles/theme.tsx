import baseStyled, { ThemedStyledInterface } from 'styled-components';
// // https://github.com/styled-components/styled-components/issues/1589#issuecomment-435613664

export const lightTheme = {
  all: {
    borderRadius: '0.5rem',
  },
  main: {
    color: '#FAFAFA',
    textColor: '#424242',
    bodyColor: '#FFF',
    cardBackgroundColor: '#FFF',
  },
  secondary: {
    color: '#757575',
    textColor: '#212121',
  },
  terciary: {
    color: '#E0E0E0',
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
    cardBackgroundColor: 'rgba(33, 33, 33, 0.58)',
  },
  secondary: {
    color: '#000',
    textColor: '#F5F5F5',
  },
  terciary: {
    color: '#424242',
  },
};

export type Theme = typeof lightTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
