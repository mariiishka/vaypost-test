import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#F50057',
    },
  },
  typography: {
    h3: {
      fontSize: '40px',
      fontWeight: 'bold',
      lineHeight: '112px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1488,
    },
  },
});

export default defaultTheme;
