import { useState } from "react";
import {
  Box,
  Typography,
  Fade,
  Zoom,
  Slide,
  useTheme
} from "@mui/material";

export default function ImageGallery({ images }: { images: string[] }) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <Fade in timeout={800}>
        <Box
          sx={{
            width: "100%",
            height: 300,
            backgroundColor: theme.palette.background.default,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Нет изображений
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box>
      <Zoom in timeout={600}>
        <Box
          sx={{
            width: "100%",
            height: 300,
            backgroundColor: theme.palette.background.default,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            overflow: "hidden",
            mb: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }
          }}
        >
          <img
            src={images[selectedImage]}
            alt={`Основное ${selectedImage + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transition: 'transform 0.5s ease'
            }}
          />
        </Box>
      </Zoom>

      {images.length > 1 && (
        <Slide in timeout={800} direction="up">
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            overflowX: 'auto',
            py: 1
          }}>
            {images.map((img, index) => (
              <Fade in timeout={1000} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: theme.palette.background.default,
                    borderRadius: 1,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: selectedImage === index 
                      ? `2px solid ${theme.palette.primary.main}` 
                      : `1px solid ${theme.palette.divider}`,
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}30`
                    }
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`Миниатюра ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
        </Slide>
      )}
    </Box>
  );
}