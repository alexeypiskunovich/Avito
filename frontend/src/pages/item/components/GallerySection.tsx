import {
  Box,
  Paper,
  Typography,
  Slide,
  useTheme
} from "@mui/material";
import ImageGallery from './ImageGallery';

interface GallerySectionProps {
  images: string[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const theme = useTheme();

  return (
    <Box flex={{ xs: "1 1 100%", md: "1 1 40%" }}>
      <Slide in timeout={600} direction="right">
        <Paper elevation={1} sx={{ 
          p: 2, 
          backgroundColor: theme.palette.background.paper, 
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)'
          }
        }}>
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
            Галерея ({images.length})
          </Typography>
          <ImageGallery images={images} />
        </Paper>
      </Slide>
    </Box>
  );
}