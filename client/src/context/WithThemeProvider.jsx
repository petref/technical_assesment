import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDarkMode } from './WithDarkModeContext';
import CssBaseline from '@mui/material/CssBaseline';

const WithThemeProvider = ({ children }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme =  useMemo(
    () =>
      createTheme({
        palette: { 
          mode: darkMode ? "dark" : "light",
          primary: {
            main: '#357d8a',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
          },
          secondary: {
            main: '#357d8a',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
          },
          text: {
            main: '#1c1f20',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
          },
        },
      }),
    [darkMode]
  )
  

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
      </ThemeProvider>
  )
}
export default WithThemeProvider;