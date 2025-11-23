import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Container, 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Box,
  Switch,
  Typography,
  
  FormControlLabel
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import ListingPage from '../pages/list/ListingPage';
import ItemModerationView from '../pages/item/ItemModerationView';
import ModeratorStats from '../pages/stats/ModeratorStats';

export const lightColors = {
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

export const darkColors = {
  primary: '#90caf9',
  secondary: '#f48fb1',
  success: '#81c784',
  warning: '#ffb74d',
  error: '#e57373',
  background: '#121212',
  paper: '#1e1e1e',
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  border: '#333333',
};

function ThemeToggle({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  
  
  return (
    <FormControlLabel
      control={
        <Switch
          checked={darkMode}
          onChange={onToggle}
          sx={{
            m: 1,
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: darkMode ? darkColors.primary : lightColors.primary,
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: darkMode ? darkColors.primary : lightColors.primary,
            },
          }}
        />
      }
      label={
        <Typography variant="body2" sx={{ color: 'inherit', whiteSpace: 'nowrap' }}>
          {darkMode ? '🌙 Тёмная' : '☀️ Светлая'}
        </Typography>
      }
      sx={{ ml: 2, color: 'inherit' }}
    />
  );
}

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? darkColors.primary : lightColors.primary,
      },
      secondary: {
        main: darkMode ? darkColors.secondary : lightColors.secondary,
      },
      background: {
        default: darkMode ? darkColors.background : lightColors.background,
        paper: darkMode ? darkColors.paper : lightColors.paper,
      },
      text: {
        primary: darkMode ? darkColors.textPrimary : lightColors.textPrimary,
        secondary: darkMode ? darkColors.textSecondary : lightColors.textSecondary,
      },
      error: {
        main: darkMode ? darkColors.error : lightColors.error,
      },
      warning: {
        main: darkMode ? darkColors.warning : lightColors.warning,
      },
      success: {
        main: darkMode ? darkColors.success : lightColors.success,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? darkColors.paper : lightColors.paper,
            color: darkMode ? darkColors.textPrimary : lightColors.textPrimary,
            borderBottom: `1px solid ${darkMode ? darkColors.border : lightColors.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? darkColors.paper : lightColors.paper,
            border: `1px solid ${darkMode ? darkColors.border : lightColors.border}`,
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? darkColors.paper : lightColors.paper,
            border: `1px solid ${darkMode ? darkColors.border : lightColors.border}`,
          },
        },
      },
    },
  }), [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button 
              color="inherit" 
              component={Link} 
              to="/list"
              sx={{ mr: 2 }}
            >
              Список объявлений
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/stats"
              sx={{ mr: 2 }}
            >
              Статистика
            </Button>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<ListingPage />} />
            <Route path="/list" element={<ListingPage />} />
            <Route path="/item/:id" element={<ItemModerationView />} />
            <Route path="/stats" element={<ModeratorStats />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;