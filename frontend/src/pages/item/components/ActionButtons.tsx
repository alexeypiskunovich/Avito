import {
  Stack,
  Button,
  Slide,
  useTheme
} from "@mui/material";

interface ActionButtonsProps {
  onApprove: () => void;
  onReject: () => void;
  onRequestRevision: () => void;
}

export default function ActionButtons({ onApprove, onReject, onRequestRevision }: ActionButtonsProps) {
  const theme = useTheme();

  const buttonStyle = {
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
    px: 3,
    '&:hover': { 
      transform: 'translateY(-2px)',
    }
  };

  return (
    <Slide in timeout={1200} direction="up">
      <Stack direction="row" spacing={2} mt={3}>
        <Button 
          variant="contained" 
          sx={{ 
            ...buttonStyle,
            backgroundColor: theme.palette.success.main, 
            '&:hover': { 
              ...buttonStyle['&:hover'],
              backgroundColor: theme.palette.mode === 'dark' ? '#2e7d32' : '#1b5e20',
              boxShadow: `0 6px 20px ${theme.palette.success.main}40`
            },
          }}
          onClick={onApprove}
        >
          Одобрить
        </Button>
        <Button
          variant="contained"
          sx={{ 
            ...buttonStyle,
            backgroundColor: theme.palette.error.main, 
            '&:hover': { 
              ...buttonStyle['&:hover'],
              backgroundColor: theme.palette.mode === 'dark' ? '#d32f2f' : '#c62828',
              boxShadow: `0 6px 20px ${theme.palette.error.main}40`
            },
          }}
          onClick={onReject}
        >
          Отклонить
        </Button>
        <Button
          variant="contained"
          sx={{ 
            ...buttonStyle,
            backgroundColor: theme.palette.warning.main, 
            '&:hover': { 
              ...buttonStyle['&:hover'],
              backgroundColor: theme.palette.mode === 'dark' ? '#ed6c02' : '#e65100',
              boxShadow: `0 6px 20px ${theme.palette.warning.main}40`
            },
          }}
          onClick={onRequestRevision}
        >
          Вернуть на доработку
        </Button>
      </Stack>
    </Slide>
  );
}