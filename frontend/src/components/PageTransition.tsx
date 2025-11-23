
import { Box } from '@mui/material';
import { type ReactNode, useState, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  locationKey?: string;
}

export default function PageTransition({ children, locationKey }: PageTransitionProps) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage('fadeOut');
    }
  }, [children, displayChildren]);

  const handleTransitionEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayChildren(children);
      setTransitionStage('fadeIn');
    }
  };

  return (
    <Box
      sx={{
        opacity: transitionStage === 'fadeIn' ? 1 : 0,
        transform: transitionStage === 'fadeIn' ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      {displayChildren}
    </Box>
  );
}