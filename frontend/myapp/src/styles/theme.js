import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f3ff',
      light: '#4ff5ff',
      dark: '#00a7b3',
      contrastText: '#000000',
    },
    secondary: {
      main: '#121212',
      light: '#2c2c2c',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#0a0a0a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Share Tech Mono", monospace',
          borderRadius: 8,
          textTransform: 'none',
          letterSpacing: '1px',
          '&:hover': {
            boxShadow: '0 0 15px #00f3ff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontFamily: '"Share Tech Mono", monospace',
            '& fieldset': {
              borderColor: 'rgba(0, 243, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 243, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00f3ff',
              boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Share Tech Mono", monospace',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Share Tech Mono", monospace',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Share Tech Mono", monospace',
    h1: {
      fontWeight: 600,
      letterSpacing: '2px',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '2px',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '2px',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '1.5px',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '1.5px',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '1.5px',
    },
    body1: {
      letterSpacing: '1px',
    },
    body2: {
      letterSpacing: '1px',
    },
  },
});