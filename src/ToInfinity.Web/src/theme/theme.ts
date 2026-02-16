import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3D2F25',
      light: '#5C4D42',
      dark: '#2A1F18',
      contrastText: '#FDFCFB',
    },
    secondary: {
      main: '#C4724E',
      light: '#D98A6A',
      dark: '#A85A3A',
      contrastText: '#FDFCFB',
    },
    background: {
      default: '#F5F3F0',
      paper: '#FDFCFB',
    },
    text: {
      primary: '#3D2F25',
      secondary: '#6B5D54',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
    },
  },
});
