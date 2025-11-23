import {
  Box,
  CircularProgress,
  Fade
} from "@mui/material";

export default function LoadingState() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
      <Fade in timeout={800}>
        <CircularProgress />
      </Fade>
    </Box>
  );
}