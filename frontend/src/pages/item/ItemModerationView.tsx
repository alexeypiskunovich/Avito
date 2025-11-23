import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { api } from '../../services/api';
import type { ApiAdvertisement } from '../../services/types';
import ProgressBar from '../../components/ProgressBar';
import PageTransition from '../../components/PageTransition';
import GallerySection from "./components/GallerySection";
import HistorySection from "./components/HistorySection";
import AdDescription from "./components/AdDescription";
import ActionButtons from "./components/ActionButtons";
import NavigationButtons from "./components/NavigationButtons";
import RevisionDialog from "./components/RevisionDialog";
import RejectDialog from "./components/RejectDialog";
import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";

export default function ItemModerationView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [ad, setAd] = useState<ApiAdvertisement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openRevisionDialog, setOpenRevisionDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  const fetchAd = async (adId: string) => {
    try {
      setLoading(true);
      setError(null);
      const advertisement = await api.getAdById(adId);
      setAd(advertisement);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setError("Не удалось загрузить данные объявления");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAd(id);
    }
  }, [id]);

  const handleApprove = async () => {
    if (ad) {
      try {
        await api.approveAd(ad.id);
        fetchAd(id!);
      } catch (err) {
        console.error('Ошибка одобрения:', err);
      }
    }
  };

  const handleReject = async (reason: string, comment?: string) => {
    if (ad) {
      try {
        await api.rejectAd(ad.id, { reason, comment });
        fetchAd(id!);
      } catch (err) {
        console.error('Ошибка отклонения:', err);
      }
    }
  };

  const handleRequestRevision = async (reason: string, comment?: string) => {
    if (ad) {
      try {
        await api.requestChangesAd(ad.id, { reason, comment });
        fetchAd(id!);
      } catch (err) {
        console.error('Ошибка запроса доработки:', err);
      }
    }
  };

  const handleOpenRevisionDialog = () => {
    setOpenRevisionDialog(true);
  };

  const handleOpenRejectDialog = () => {
    setOpenRejectDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenRevisionDialog(false);
    setOpenRejectDialog(false);
  };

  const handleNext = () => {
    if (ad) {
      navigate(`/item/${Number(id) + 1}`);
    }
  };

  const handlePrev = () => {
    if (ad && Number(id) > 1) {
      navigate(`/item/${Number(id) - 1}`);
    }
  };

  const handleBackToList = () => {
    navigate('/list');
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!ad) {
    return <ErrorState message="Объявление не найдено" severity="warning" />;
  }

  const yearsOnSite = new Date().getFullYear() - new Date(ad.seller.registeredAt).getFullYear();

  return (
    <PageTransition>
      <Box p={2} sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <ProgressBar isLoading={loading} />
        
        <Box display="flex" gap={2} mt={2} flexWrap="wrap">
          <GallerySection images={ad.images} />
          <HistorySection history={ad.moderationHistory} />
        </Box>

        <Box mt={3}>
          <AdDescription ad={ad} yearsOnSite={yearsOnSite} />
        </Box>

        <ActionButtons
          onApprove={handleApprove}
          onReject={handleOpenRejectDialog}
          onRequestRevision={handleOpenRevisionDialog}
        />

        <NavigationButtons
          id={id}
          onBackToList={handleBackToList}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={Number(id) > 1}
        />

        <RevisionDialog
          open={openRevisionDialog}
          onClose={handleCloseDialogs}
          onConfirm={handleRequestRevision}
        />

        <RejectDialog
          open={openRejectDialog}
          onClose={handleCloseDialogs}
          onConfirm={handleReject}
        />
      </Box>
    </PageTransition>
  );
}