import { Box, Fade, Collapse, ToggleButtonGroup, ToggleButton, useTheme } from '@mui/material';

interface SortSectionProps {
    sort: {
        sortBy: 'createdAt' | 'price' | 'priority';
        sortOrder: 'asc' | 'desc';
    };
    onSortChange: (sort: any) => void;
    isLoading: boolean;
}

export default function SortSection({ sort, onSortChange, isLoading }: SortSectionProps) {
    const theme = useTheme();

    const toggleButtonStyle = {
        transition: 'all 0.3s ease',
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            transform: 'scale(1.05)'
        },
        '&:hover': {
            transform: 'translateY(-2px)',
            backgroundColor: theme.palette.action.hover
        }
    };

    return (
        <Collapse in={!isLoading} timeout={800}>
            <Box sx={{ mb: 3 }}>
                <Fade in timeout={1000}>
                    <ToggleButtonGroup
                        value={sort.sortBy}
                        onChange={(_, val) => val && onSortChange({ sortBy: val })}
                        exclusive
                        sx={{ mb: 1, mr: 2 }}
                    >
                        <ToggleButton value="createdAt" sx={toggleButtonStyle}>
                            Дата
                        </ToggleButton>
                        <ToggleButton value="price" sx={toggleButtonStyle}>
                            Цена
                        </ToggleButton>
                        <ToggleButton value="priority" sx={toggleButtonStyle}>
                            Приоритет
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Fade>

                <Fade in timeout={1200}>
                    <ToggleButtonGroup
                        value={sort.sortOrder}
                        onChange={(_, val) => val && onSortChange({ sortOrder: val })}
                        exclusive
                    >
                        <ToggleButton value="asc" sx={toggleButtonStyle}>
                            ↑
                        </ToggleButton>
                        <ToggleButton value="desc" sx={toggleButtonStyle}>
                            ↓
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Fade>
            </Box>
        </Collapse>
    );
}