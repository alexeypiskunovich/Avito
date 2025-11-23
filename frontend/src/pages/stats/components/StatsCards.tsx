import React from 'react';
import { Stack, Card, CardContent, Typography, Chip, useTheme } from '@mui/material';

interface StatCardProps {
  value: string | number;
  label: string;
  color: string;
  isChip: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color, isChip }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{
      flex: '1 1 200px',
      minWidth: 200,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
        borderColor: color,
      },
    }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          {label}
        </Typography>
        {isChip ? (
          <Chip
            label={value}
            sx={{
              backgroundColor: color,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '8px 16px',
              height: 'auto',
            }}
          />
        ) : (
          <Typography variant="h4" sx={{ color: color, fontWeight: 'bold' }}>
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

interface StatsCardsProps {
  totalChecked: number;
  approvedPercent: number;
  rejectedPercent: number;
  requestChangesPercent: number;
  avgTime: number;
}

export default function StatsCards({
  totalChecked,
  approvedPercent,
  rejectedPercent,
  requestChangesPercent,
  avgTime,
}: StatsCardsProps) {
  const theme = useTheme();

  const statsCards = [
    { value: totalChecked, label: 'Проверено объявлений', color: theme.palette.primary.main, isChip: false },
    { value: `${approvedPercent.toFixed(1)}%`, label: 'Одобрено', color: theme.palette.success.main, isChip: true },
    { value: `${rejectedPercent.toFixed(1)}%`, label: 'Отклонено', color: theme.palette.error.main, isChip: true },
    { value: `${requestChangesPercent.toFixed(1)}%`, label: 'На доработку', color: theme.palette.warning.main, isChip: true },
    { value: `${avgTime} мин`, label: 'Среднее время проверки', color: theme.palette.text.primary, isChip: false },
  ];

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      flexWrap="wrap"
      useFlexGap
      mb={4}
    >
      {statsCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </Stack>
  );
}