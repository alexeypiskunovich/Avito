import {
  Stack,
  Paper,
  Box,
  Typography,
  Chip,
  Fade,
  Grow,
  useTheme
} from "@mui/material";

interface ModerationHistoryItem {
  moderatorName: string;
  timestamp: string;
  action: string;
  reason?: string | null;
  comment?: string | null;
}

interface ModerationHistoryProps {
  history: ModerationHistoryItem[];
}

export default function ModerationHistory({ history }: ModerationHistoryProps) {
  const theme = useTheme();

  if (history.length === 0) {
    return (
      <Fade in timeout={800}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          История модерации отсутствует
        </Typography>
      </Fade>
    );
  }

  const getChipColor = (action: string) => {
    switch (action) {
      case "approved":
        return theme.palette.success.main;
      case "rejected":
        return theme.palette.error.main;
      case "request_changes":
        return theme.palette.warning.main;
      default:
        return theme.palette.divider;
    }
  };

  const getLastItemBackground = (index: number) => {
    if (index === history.length - 1) {
      return theme.palette.mode === 'dark' 
        ? theme.palette.warning.dark + '20'  
        : "#fffbe6";
    }
    return theme.palette.background.paper;
  };

  return (
    <Stack spacing={1}>
      {history.map((item, index) => (
        <Grow 
          key={index} 
          in 
          timeout={800} 
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 2,
              backgroundColor: getLastItemBackground(index),
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateX(4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              mb: 1 
            }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
                {item.moderatorName}
              </Typography>
              <Chip
                label={
                  item.action === "approved" ? "Одобрено" :
                    item.action === "rejected" ? "Отклонено" :
                      item.action === "request_changes" ? "На доработку" : "В ожидании"
                }
                sx={{
                  backgroundColor: getChipColor(item.action),
                  color: 'white',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                size="small"
              />
            </Box>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
              {new Date(item.timestamp).toLocaleString("ru-RU")}
            </Typography>
            {item.comment && (
              <Fade in timeout={1000}>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                  <strong>Комментарий:</strong> {item.comment}
                </Typography>
              </Fade>
            )}
          </Paper>
        </Grow>
      ))}
    </Stack>
  );
}