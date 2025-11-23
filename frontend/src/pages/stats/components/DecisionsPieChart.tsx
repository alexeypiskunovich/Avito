import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { PieDataItem } from '../types';

const renderSimpleLabel = (props: any) => {
  const { name, percent } = props;
  if (!percent) return null;
  return `${name} ${(percent * 100).toFixed(1)}%`;
};

interface DecisionsPieChartProps {
  data: PieDataItem[];
}

export default function DecisionsPieChart({ data }: DecisionsPieChartProps) {
  const theme = useTheme();


  const COLORS = [theme.palette.success.main, theme.palette.error.main, theme.palette.warning.main];

  if (data.length === 0) return null;

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Распределение решений
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
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              paddingAngle={2}
              label={renderSimpleLabel}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell 
                  key={index} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke={theme.palette.background.paper} 
                  strokeWidth={2} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper, 
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: '8px',
                color: theme.palette.text.primary
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}