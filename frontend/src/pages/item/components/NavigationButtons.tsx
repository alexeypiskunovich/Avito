import {
  Stack,
  Button,
  Fade,
  useTheme
} from "@mui/material";

interface NavigationButtonsProps {
  id: string | undefined;
  onBackToList: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
}

export default function NavigationButtons({ 
  id, 
  onBackToList, 
  onPrev, 
  onNext, 
  hasPrev 
}: NavigationButtonsProps) {
  const theme = useTheme();

  const buttonStyle = {
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? `${theme.palette.primary.main}20`
        : `${theme.palette.primary.main}10`,
      transform: 'translateX(-4px)'
    }
  };

  const nextButtonStyle = {
    ...buttonStyle,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? `${theme.palette.primary.main}20`
        : `${theme.palette.primary.main}10`,
      transform: 'translateX(4px)'
    }
  };

  return (
    <Fade in timeout={1400}>
      <Stack direction="row" spacing={2} mt={2}>
        <Button 
          variant="text" 
          sx={buttonStyle}
          onClick={onBackToList}
        >
          ← Назад к списку
        </Button>
        <Button 
          variant="text" 
          sx={buttonStyle}
          onClick={onPrev} 
          disabled={!id || !hasPrev}
        >
          ← Предыдущее
        </Button>
        <Button 
          variant="text" 
          sx={nextButtonStyle}
          onClick={onNext}
        >
          Следующее →
        </Button>
      </Stack>
    </Fade>
  );
}