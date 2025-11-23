import {
  type ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';

const colors = {
  primary: '#1976d2',
  secondary: '#dc004e',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  background: '#f5f5f5',
  paper: '#ffffff',
  textPrimary: '#212121',
  textSecondary: '#757575',
  border: '#e0e0e0',
};

type ThemeMode = 'light' | 'dark';

export const ThemeModeContext = createContext({
  mode: 'light' as ThemeMode,
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export function ThemeToggle({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return saved === 'light' || saved === 'dark' ? saved : prefersDarkMode ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: colors.primary },
            background: {
              default: colors.background,
              paper: colors.paper,
            },
            text: {
              primary: colors.textPrimary,
              secondary: colors.textSecondary,
            },
          }
        : {
            primary: { main: colors.primary },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
          }),
    },
  });

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}