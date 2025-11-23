import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';
import type { CategoryDataItem } from '../types';

interface CategoriesBarChartProps {
  data: CategoryDataItem[];
}

export default function CategoriesBarChart({ data }: CategoriesBarChartProps) {
  const theme = useTheme();

  if (data.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Топ категорий
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
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              type="number" 
              stroke={theme.palette.text.secondary} 
              tick={{ fill: theme.palette.text.secondary }} 
            />
            <YAxis
              type="category"
              dataKey="category"
              width={80}
              tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
              stroke={theme.palette.text.secondary}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper, 
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: '8px',
                color: theme.palette.text.primary
              }} 
            />
            <Bar 
              dataKey="count" 
              name="Количество" 
              fill={theme.palette.primary.main} 
              radius={[0, 4, 4, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}