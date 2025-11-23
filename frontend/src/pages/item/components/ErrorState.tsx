import {
  Box,
  Alert,
  Slide
} from "@mui/material";

interface ErrorStateProps {
  message: string;
  severity?: 'error' | 'warning';
}

export default function ErrorState({ message, severity = 'error' }: ErrorStateProps) {
  return (
    <Box p={3}>
      <Slide in timeout={600} direction="down">
        <Alert severity={severity} sx={{ transition: 'all 0.3s ease' }}>
          {message}
        </Alert>
      </Slide>
    </Box>
  );
}