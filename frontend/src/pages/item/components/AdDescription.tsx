import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Fade,
  Zoom,
  Rating,
  useTheme
} from "@mui/material";
import type { ApiAdvertisement } from '../../../services/types';

interface AdDescriptionProps {
  ad: ApiAdvertisement;
  yearsOnSite: number;
}

function getYearsText(years: number): string {
  if (years % 10 === 1 && years % 100 !== 11) return "год";
  if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100))
    return "года";
  return "лет";
}

function getAdsCountText(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) return "объявление";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
    return "объявления";
  return "объявлений";
}

export default function AdDescription({ ad, yearsOnSite }: AdDescriptionProps) {
  const theme = useTheme();

  return (
    <Zoom in timeout={1000}>
      <Paper elevation={1} sx={{ 
        p: 2, 
        backgroundColor: theme.palette.background.paper, 
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)'
        }
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Полное описание
        </Typography>
        <Fade in timeout={1200}>
          <Typography variant="body2" mb={2} sx={{ 
            whiteSpace: "pre-wrap", 
            color: theme.palette.text.primary,
            lineHeight: 1.6
          }}>
            {ad.description}
          </Typography>
        </Fade>

        <Divider sx={{ my: 2, backgroundColor: theme.palette.divider }} />

        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Характеристики
        </Typography>
        <Table size="small">
          <TableBody>
            {Object.entries(ad.characteristics).map(([key, value], index) => (
              <Fade in timeout={1400} key={key} style={{ transitionDelay: `${index * 50}ms` }}>
                <TableRow sx={{ 
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? `${theme.palette.background.default}80`
                      : `${theme.palette.background.default}40`
                  }
                }}>
                  <TableCell sx={{ 
                    fontWeight: "bold", 
                    width: "30%", 
                    color: theme.palette.text.primary 
                  }}>
                    {key}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{value}</TableCell>
                </TableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 2, backgroundColor: theme.palette.divider }} />

        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Продавец
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Fade in timeout={1600}>
            <Typography variant="body1" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
              {ad.seller.name}
            </Typography>
          </Fade>
          <Fade in timeout={1800}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating 
                value={Number(ad.seller.rating) || 0} 
                readOnly 
                size="small" 
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                ({ad.seller.rating || 0})
              </Typography>
            </Box>
          </Fade>
          <Fade in timeout={2000}>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
              На сайте: {yearsOnSite} {getYearsText(yearsOnSite)}
            </Typography>
          </Fade>
          <Fade in timeout={2200}>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
              {ad.seller.totalAds} {getAdsCountText(ad.seller.totalAds)}
            </Typography>
          </Fade>
          <Fade in timeout={2400}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Зарегистрирован: {new Date(ad.seller.registeredAt).toLocaleDateString('ru-RU')}
            </Typography>
          </Fade>
        </Box>
      </Paper>
    </Zoom>
  );
}