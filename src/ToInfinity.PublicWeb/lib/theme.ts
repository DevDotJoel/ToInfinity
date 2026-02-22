'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3D2F25',
      light: '#5D4F45',
      dark: '#2D1F15',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C4724E',
      light: '#D48E6E',
      dark: '#A4523E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
