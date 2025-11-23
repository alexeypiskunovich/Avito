import React from 'react';
import { Button, Stack, Box, Typography, useTheme } from '@mui/material';
import { Download, PictureAsPdf } from '@mui/icons-material';
import type { ExportData } from '../../../services/exportService';
import { exportToCSV, exportToPDF } from '../../../services/exportService';

interface ExportButtonsProps {
  exportData: ExportData;
  disabled?: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ 
  exportData, 
  disabled = false 
}) => {
  const theme = useTheme();

  const handleCSVExport = () => {
    try {
      exportToCSV(exportData, `статистика_модерации_${exportData.period}`);
    } catch (error) {
      alert('Ошибка при экспорте в CSV. Пожалуйста, попробуйте еще раз.');
      console.error('CSV Export error:', error);
    }
  };

  const handlePDFExport = async () => {
    try {
      await exportToPDF(exportData, `статистика_модерации_${exportData.period}`);
    } catch (error) {
      alert('Ошибка при экспорте в PDF. Пожалуйста, попробуйте еще раз.');
      console.error('PDF Export error:', error);
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      border: 1, 
      borderColor: theme.palette.divider, 
      borderRadius: 2, 
      backgroundColor: theme.palette.background.paper,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)'
      }
    }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Экспорт данных
      </Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
        Скачайте отчет о модерации за выбранный период
      </Typography>
      
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={handleCSVExport}
          disabled={disabled}
          sx={{ 
            borderRadius: 2,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
            }
          }}
        >
          CSV
        </Button>
        
        <Button
          variant="contained"
          startIcon={<PictureAsPdf />}
          onClick={handlePDFExport}
          disabled={disabled}
          sx={{ 
            borderRadius: 2,
            backgroundColor: '#d32f2f',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#b71c1c',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
            }
          }}
        >
          PDF
        </Button>
      </Stack>
    </Box>
  );
};

export default ExportButtons;