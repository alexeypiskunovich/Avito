import { useEffect, useState } from 'react';
import {
  Box, Typography, ToggleButtonGroup, ToggleButton,
  CircularProgress, Alert, Snackbar
} from '@mui/material';
import { api } from '../../services/api';
import type { ActivityResponse, DecisionsData } from '../../services/types';
import { useTheme } from '@mui/material/styles';
import ProgressBar from '../../components/ProgressBar';
import PageTransition from '../../components/PageTransition';

import StatsCards from './components/StatsCards';
import ActivityChart from './components/ActivityChart';
import DecisionsPieChart from './components/DecisionsPieChart';
import CategoriesBarChart from './components/CategoriesBarChart';
import NoDataPlaceholder from './components/NoDataPlaceholder';
import ExportButtons from './components/ExportButtons';
import type { FormattedActivityItem, PieDataItem, CategoryDataItem } from './types';
import type { ExportData } from '../../services/exportService';

export default function ModeratorStats() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const [activityData, setActivityData] = useState<FormattedActivityItem[]>([]);
  const [decisionData, setDecisionData] = useState<PieDataItem[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataItem[]>([]);
  const [totalChecked, setTotalChecked] = useState(0);
  const [approvedPercent, setApprovedPercent] = useState(0);
  const [rejectedPercent, setRejectedPercent] = useState(0);
  const [requestChangesPercent, setRequestChangesPercent] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  
  const [rawData, setRawData] = useState<{
    activity: ActivityResponse[];
    decisions: DecisionsData;
    categories: any;
    summary: any;
  } | null>(null);
  
  const theme = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [summary, activity, decisions, categories] = await Promise.all([
          api.getStatsSummary(period),
          api.getActivityStats(period),
          api.getDecisionsStats(period),
          api.getCategoriesStats(period),
        ]);

        setRawData({ activity, decisions, categories, summary });

        setTotalChecked(summary.totalReviewed || 0);
        setApprovedPercent(summary.approvedPercentage || 0);
        setRejectedPercent(summary.rejectedPercentage || 0);
        setRequestChangesPercent(summary.requestChangesPercentage || 0);
        
        const avgTimeInSeconds = summary.averageReviewTime || 0;
        const avgTimeInMinutes = Math.round(avgTimeInSeconds / 60);
        setAvgTime(avgTimeInMinutes);

        const formattedActivity: FormattedActivityItem[] = activity.map((item: ActivityResponse) => ({
          date: item.date,
          day: new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
          approved: item.approved || 0,
          rejected: item.rejected || 0,
          requestChanges: item.requestChanges || 0,
          total: (item.approved || 0) + (item.rejected || 0) + (item.requestChanges || 0)
        }));
        setActivityData(formattedActivity);

        const totalDecisions = (decisions.approved || 0) + (decisions.rejected || 0) + (decisions.requestChanges || 0);
        const formattedDecisions: PieDataItem[] = [
          { name: 'Одобрено', value: decisions.approved || 0, percent: totalDecisions > 0 ? (decisions.approved || 0) / totalDecisions : 0 },
          { name: 'Отклонено', value: decisions.rejected || 0, percent: totalDecisions > 0 ? (decisions.rejected || 0) / totalDecisions : 0 },
          { name: 'На доработку', value: decisions.requestChanges || 0, percent: totalDecisions > 0 ? (decisions.requestChanges || 0) / totalDecisions : 0 }
        ].filter(item => item.value > 0);
        setDecisionData(formattedDecisions);

        const formattedCategories: CategoryDataItem[] = Object.entries(categories)
          .map(([category, count]) => ({
            category: category.length > 10 ? `${category.substring(0, 10)}...` : category,
            count: count as number
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
        setCategoryData(formattedCategories);

      } catch (error: any) {
        console.error('Ошибка загрузки статистики:', error);
        setError(error.response?.data?.message || 'Не удалось загрузить статистику');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);


  const getExportData = (): ExportData => {
    if (!rawData) {
      return {
        period: getPeriodText(period),
        totalReviewed: 0,
        approved: 0,
        rejected: 0,
        requestChanges: 0,
        averageTime: 0,
        activityData: [],
        categoryData: []
      };
    }

    const { activity, decisions, categories, summary } = rawData;

    return {
      period: getPeriodText(period),
      totalReviewed: summary.totalReviewed || 0,
      approved: decisions.approved || 0,
      rejected: decisions.rejected || 0,
      requestChanges: decisions.requestChanges || 0,
      averageTime: summary.averageReviewTime || 0,
      activityData: activity.map(item => ({
        date: item.date,
        approved: item.approved || 0,
        rejected: item.rejected || 0,
        requestChanges: item.requestChanges || 0,
        total: (item.approved || 0) + (item.rejected || 0) + (item.requestChanges || 0)
      })),
      categoryData: Object.entries(categories)
        .map(([category, count]) => ({
          category,
          count: count as number
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
    };
  };

  const getPeriodText = (period: string): string => {
    switch (period) {
      case 'today': return 'сегодня';
      case 'week': return '7_дней';
      case 'month': return '30_дней';
      default: return period;
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const hasData = activityData.length > 0 || decisionData.length > 0 || categoryData.length > 0;
  const exportData = getExportData();

  return (
    <PageTransition>
      <Box p={3} sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <ProgressBar isLoading={loading || exportLoading} />
        
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3} flexWrap="wrap" gap={2}>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
            Аналитика
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={period}
          onChange={(_, val) => val && setPeriod(val)}
          exclusive
          sx={{ mb: 3 }}
        >
          <ToggleButton value="today">Сегодня</ToggleButton>
          <ToggleButton value="week">7 дней</ToggleButton>
          <ToggleButton value="month">30 дней</ToggleButton>
        </ToggleButtonGroup>

       
        {hasData && (
          <Box mb={4}>
            <ExportButtons 
              exportData={exportData}
              disabled={exportLoading}
            />
          </Box>
        )}

        <StatsCards
          totalChecked={totalChecked}
          approvedPercent={approvedPercent}
          rejectedPercent={rejectedPercent}
          requestChangesPercent={requestChangesPercent}
          avgTime={avgTime}
        />

        {hasData ? (
          <>
            <ActivityChart data={activityData} />
            <DecisionsPieChart data={decisionData} />
            <CategoriesBarChart data={categoryData} />
          </>
        ) : (
          <NoDataPlaceholder />
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={snackbar.message}
        />
      </Box>
    </PageTransition>
  );
}