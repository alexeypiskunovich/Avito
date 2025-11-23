import { useState, useEffect } from 'react';
import { Stack, Fade, Slide, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Box, Typography, Slider, Button, OutlinedInput, useTheme } from '@mui/material';

const categories = [
    { id: 1, label: 'Недвижимость' },
    { id: 2, label: 'Транспорт' },
    { id: 3, label: 'Работа' },
    { id: 4, label: 'Услуги' },
    { id: 5, label: 'Животные' },
    { id: 6, label: 'Мода' },
    { id: 7, label: 'Детское' }
];

const statuses = ['pending', 'approved', 'rejected', 'draft'];

function getStatusText(status: string): string {
    switch (status) {
        case 'pending': return 'На модерации';
        case 'approved': return 'Одобрено';
        case 'rejected': return 'Отклонено';
        case 'draft': return 'Черновик';
        default: return status;
    }
}

interface FiltersSectionProps {
    filters: {
        search: string;
        categoryId: number | ''; 
        status: string[];
        price: number[];
    };
    onFilterChange: (filters: any) => void;
    onResetFilters: () => void;
}

export default function FiltersSection({ filters, onFilterChange, onResetFilters }: FiltersSectionProps) {
    const theme = useTheme();
    const [localFilters, setLocalFilters] = useState(filters);
    const [filtersChanged, setFiltersChanged] = useState(false);

    useEffect(() => {
        setLocalFilters(filters);
        setFiltersChanged(false);
    }, [filters]);

    const handleLocalFilterChange = (newFilters: Partial<typeof filters>) => {
        const updatedFilters = { ...localFilters, ...newFilters };
        setLocalFilters(updatedFilters);
        setFiltersChanged(true);
    };

    const handleApplyFilters = () => {
        onFilterChange(localFilters);
        setFiltersChanged(false);
    };

    const handleReset = () => {
        const defaultFilters = {
            search: '',
            categoryId: '' as number | '', 
            status: [],
            price: [0, 100000],
        };
        setLocalFilters(defaultFilters);
        setFiltersChanged(true);
        onResetFilters();
    };

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
    };

    return (
        <Slide in timeout={600} direction="down">
            <Stack spacing={2} mb={3}>
                <Fade in timeout={800}>
                    <TextField
                        label="Поиск"
                        value={localFilters.search}
                        onChange={(e) => handleLocalFilterChange({ search: e.target.value })}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            transition: 'all 0.3s ease',
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                    transform: 'translateY(-2px)',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                    color: theme.palette.primary.main,
                                },
                            },
                        }}
                    />
                </Fade>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Fade in timeout={1000}>
                        <FormControl 
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                minWidth: 120,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <InputLabel 
                                sx={{
                                    '&.Mui-focused': {
                                        color: theme.palette.primary.main,
                                    },
                                    '&.MuiFormLabel-filled': {
                                        transform: 'translate(14px, -9px) scale(0.75)',
                                        backgroundColor: theme.palette.background.paper,
                                        padding: '0 8px',
                                    },
                                }}
                            >
                                Категория
                            </InputLabel>
                            <Select
                                value={localFilters.categoryId === '' ? '' : localFilters.categoryId.toString()}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryId = value === '' ? '' : Number(value);
                                    handleLocalFilterChange({ categoryId });
                                }}
                                input={<OutlinedInput label="Категория" />}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.divider,
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <MenuItem value="">Все</MenuItem>
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id.toString()}>{cat.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Fade>

                    <Fade in timeout={1200}>
                        <FormControl 
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                minWidth: 120,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <InputLabel 
                                sx={{
                                    '&.Mui-focused': {
                                        color: theme.palette.primary.main,
                                    },
                                    '&.MuiFormLabel-filled': {
                                        transform: 'translate(14px, -9px) scale(0.75)',
                                        backgroundColor: theme.palette.background.paper,
                                        padding: '0 8px',
                                    },
                                }}
                            >
                                Статус
                            </InputLabel>
                            <Select
                                multiple
                                value={localFilters.status}
                                onChange={(e) => handleLocalFilterChange({ status: e.target.value as string[] })}
                                renderValue={(selected: string[]) => selected.map(getStatusText).join(', ')}
                                input={<OutlinedInput label="Статус" />}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.divider,
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main,
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                {statuses.map(s => (
                                    <MenuItem key={s} value={s}>
                                        <Checkbox 
                                            checked={localFilters.status.includes(s)} 
                                            sx={{
                                                color: theme.palette.primary.main,
                                                '&.Mui-checked': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                        <ListItemText primary={getStatusText(s)} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Fade>
                </Stack>

                <Fade in timeout={1400}>
                    <Box sx={{
                        px: 2,
                        py: 3,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            borderColor: theme.palette.primary.main,
                        }
                    }}>
                        <Typography gutterBottom sx={{ color: theme.palette.text.primary }}>
                            Цена: {formatPrice(localFilters.price[0])} - {formatPrice(localFilters.price[1])}
                        </Typography>
                        <Slider
                            value={localFilters.price}
                            onChange={(_, val) => handleLocalFilterChange({ price: val as number[] })}
                            valueLabelDisplay="auto"
                            valueLabelFormat={formatPrice}
                            min={0}
                            max={100000}
                            step={1000}
                            sx={{
                                color: theme.palette.primary.main,
                                '& .MuiSlider-thumb': {
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.2)',
                                        boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`
                                    }
                                },
                                '& .MuiSlider-valueLabel': {
                                    backgroundColor: theme.palette.primary.main,
                                }
                            }}
                        />
                    </Box>
                </Fade>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Fade in timeout={1600}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    backgroundColor: theme.palette.mode === 'dark' 
                                        ? `${theme.palette.primary.main}20`
                                        : `${theme.palette.primary.main}10`,
                                    borderColor: theme.palette.primary.main,
                                }
                            }}
                            onClick={handleReset}
                        >
                            Сбросить фильтры
                        </Button>
                    </Fade>

                    {filtersChanged && (
                        <Fade in timeout={1600}>
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
                                onClick={handleApplyFilters}
                            >
                                Применить фильтры
                            </Button>
                        </Fade>
                    )}
                </Stack>
            </Stack>
        </Slide>
    );
}