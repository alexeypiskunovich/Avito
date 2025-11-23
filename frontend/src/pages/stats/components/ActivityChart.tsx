import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import type { FormattedActivityItem } from '../types';

interface ActivityChartProps {
  data: FormattedActivityItem[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  const theme = useTheme();

  if (data.length === 0) return null;

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Активность проверок
      </Typography>
      <Paper elevation={1} sx={{
        p: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)'
        }
      }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="day" 
              stroke={theme.palette.text.secondary} 
              tick={{ fill: theme.palette.text.secondary }} 
            />
            <YAxis 
              stroke={theme.palette.text.secondary} 
              tick={{ fill: theme.palette.text.secondary }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper, 
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: '8px',
                color: theme.palette.text.primary
              }} 
            />
            <Legend />
            <Bar 
              dataKey="approved" 
              name="Одобрено" 
              fill={theme.palette.success.main} 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="rejected" 
              name="Отклонено" 
              fill={theme.palette.error.main} 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="requestChanges" 
              name="На доработку" 
              fill={theme.palette.warning.main} 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}