
import { Box, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { colors } from '../theme/colors';

interface ProgressBarProps {
  isLoading: boolean;
}

export default function ProgressBar({ isLoading }: ProgressBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'transparent',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      {isVisible && (
        <LinearProgress 
          sx={{
            height: '3px',
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              backgroundColor: colors.primary,
              animation: 'progressAnimation 2s ease-in-out infinite',
            },
            '@keyframes progressAnimation': {
              '0%': {
                transform: 'translateX(-100%)',
              },
              '50%': {
                transform: 'translateX(0%)',
              },
              '100%': {
                transform: 'translateX(100%)',
              },
            },
          }}
        />
      )}
    </Box>
  );
}