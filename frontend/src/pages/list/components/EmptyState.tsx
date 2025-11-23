import { Box, Fade, Typography, useTheme } from '@mui/material';

export default function EmptyState() {
    const theme = useTheme();

    return (
        <Fade in timeout={800}>
            <Box sx={{
                textAlign: 'center',
                py: 8,
                transition: 'opacity 0.3s ease'
            }}>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                    Объявления не найдены
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Попробуйте изменить параметры фильтрации
                </Typography>
            </Box>
        </Fade>
    );
}