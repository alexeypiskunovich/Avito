import { Paper, Typography, useTheme } from '@mui/material';

export default function NoDataPlaceholder() {
  const theme = useTheme();

  return (
    <Paper elevation={1} sx={{
      p: 4,
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)'
      }
    }}>
      <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
        
      </Typography>
      <Typography sx={{ color: theme.palette.text.secondary }}>
        Нет данных для выбранного периода
      </Typography>
    </Paper>
  );
}