import { Stack, Zoom, Box, Card, CardContent, CardMedia, Typography, Chip, Button, useTheme } from '@mui/material';
import type { Listing } from '../../../services/types';

function getStatusText(status: string): string {
    switch (status) {
        case 'pending': return 'На модерации';
        case 'approved': return 'Одобрено';
        case 'rejected': return 'Отклонено';
        case 'draft': return 'Черновик';
        default: return status;
    }
}

function getStatusBackgroundColor(status: string, theme: any): string {
    switch (status) {
        case 'approved': return theme.palette.success.main;
        case 'pending': return theme.palette.warning.main;
        case 'rejected': return theme.palette.error.main;
        default: return theme.palette.divider;
    }
}

interface ListingsGridProps {
    listings: Listing[];
    isLoading: boolean;
    onCardClick: (itemId: number) => void;
}

export default function ListingsGrid({ listings, isLoading, onCardClick }: ListingsGridProps) {
    const theme = useTheme();

    return (
        <Stack spacing={2}>
            {listings.map((item, index) => (
                <Zoom
                    key={item.id}
                    in={!isLoading}
                    timeout={500}
                    style={{
                        transitionDelay: isLoading ? '0ms' : `${index * 100}ms`
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                '& .card-image': {
                                    transform: 'scale(1.05)'
                                }
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onClick={() => onCardClick(item.id)}
                    >
                        <Card
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                overflow: 'hidden',
                                '&:hover': {
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <CardMedia
                                    component="img"
                                    className="card-image"
                                    sx={{
                                        width: 200,
                                        transition: 'transform 0.5s ease',
                                    }}
                                    image={item.images?.[0] || '/placeholder.jpg'}
                                    alt={item.title}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Box
                                        mt={2}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                        flexDirection={{ xs: 'column', md: 'row' }}
                                    >
                                        <Box>
                                            <Typography variant="h6" sx={{
                                                color: theme.palette.text.primary,
                                                transition: 'color 0.2s ease',
                                                '&:hover': {
                                                    color: theme.palette.primary.main
                                                }
                                            }}>
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{
                                                color: theme.palette.text.secondary,
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {item.price?.toLocaleString('ru-RU')} ₽
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                                {item.category || `Категория #${item.categoryId}`} • {new Date(item.createdAt).toLocaleDateString()}
                                            </Typography>

                                            <Stack direction="row" spacing={1} mt={1}>
                                                <Chip
                                                    label={getStatusText(item.status)}
                                                    sx={{
                                                        backgroundColor: getStatusBackgroundColor(item.status, theme),
                                                        color: 'white',
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.05)'
                                                        }
                                                    }}
                                                />
                                                <Chip
                                                    label={item.priority === 'urgent' ? 'Срочный' : 'Обычный'}
                                                    variant="outlined"
                                                    sx={{
                                                        borderColor: theme.palette.primary.main,
                                                        color: theme.palette.primary.main,
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.05)',
                                                            backgroundColor: theme.palette.mode === 'dark' 
                                                                ? `${theme.palette.primary.main}20`
                                                                : `${theme.palette.primary.main}10`
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                        </Box>

                                        <Box mt={{ xs: 2, md: 0 }} display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
                                                        backgroundColor: theme.palette.primary.main
                                                    }
                                                }}
                                            >
                                                Открыть
                                            </Button>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Stack>
                        </Card>
                    </Box>
                </Zoom>
            ))}
        </Stack>
    );
}