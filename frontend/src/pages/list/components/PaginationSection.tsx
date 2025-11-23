import { Box, Fade, Pagination, Typography, useTheme } from '@mui/material';

interface PaginationSectionProps {
    totalItems: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
}

export default function PaginationSection({ totalItems, page, limit, onPageChange, isLoading }: PaginationSectionProps) {
    const theme = useTheme();

    return (
        <Fade in={!isLoading && totalItems > 0} timeout={1000}>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Pagination
                    count={Math.ceil(totalItems / limit)}
                    page={page}
                    onChange={(_, value) => onPageChange(value)}
                    color="primary"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' 
                                    ? `${theme.palette.primary.main}30`
                                    : `${theme.palette.primary.main}20`,
                                transform: 'scale(1.1)',
                            },
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                transform: 'scale(1.1)',
                                boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                    transform: 'scale(1.15)',
                                }
                            }
                        }
                    }}
                />
                <Fade in timeout={1200}>
                    <Typography variant="body2" mt={2} sx={{ color: theme.palette.text.secondary }}>
                        Всего: {totalItems} объявлений
                    </Typography>
                </Fade>
            </Box>
        </Fade>
    );
}