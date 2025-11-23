import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Fade,
  Slide,
  useTheme
} from "@mui/material";

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string, comment?: string) => void;
}

const rejectionReasons = [
  { label: "Запрещенный товар", value: "Запрещенный товар" },
  { label: "Неверная категория", value: "Неверная категория" },
  { label: "Некорректное описание", value: "Некорректное описание" },
  { label: "Проблемы с фото", value: "Проблемы с фото" },
  { label: "Подозрение на мошенничество", value: "Подозрение на мошенничество" },
];

export default function RejectDialog({
  open,
  onClose,
  onConfirm
}: RejectDialogProps) {
  const theme = useTheme();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState("");
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    const reasons = [...selectedReasons];
    if (selectedReasons.includes("Другое") && customReason.trim()) {
      reasons.push(customReason.trim());
    }
    const reasonText = reasons.filter((r) => r !== "Другое").join(", ");

    onConfirm(reasonText, comment);
    handleClose();
  };

  const handleClose = () => {
    setSelectedReasons([]);
    setCustomReason("");
    setComment("");
    onClose();
  };

  const handleReasonsChange = (reason: string, checked: boolean) => {
    setSelectedReasons(
      checked
        ? [...selectedReasons, reason]
        : selectedReasons.filter((r) => r !== reason)
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Fade}
      transitionDuration={400}
    >
      <DialogTitle sx={{ 
        backgroundColor: theme.palette.error.main,
        color: 'white',
        fontWeight: 'bold'
      }}>
        Отклонить объявление
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Причина отклонения:
        </Typography>
        <Stack direction="column" spacing={1}>
          {rejectionReasons.map((reason, index) => (
            <Fade in timeout={600} key={reason.value} style={{ transitionDelay: `${index * 100}ms` }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedReasons.includes(reason.value)}
                    onChange={(e) => handleReasonsChange(reason.value, e.target.checked)}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                }
                label={reason.label}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? `${theme.palette.background.default}50`
                      : `${theme.palette.background.default}30`,
                    borderRadius: 1,
                    px: 1
                  }
                }}
              />
            </Fade>
          ))}
          <Fade in timeout={800}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedReasons.includes("Другое")}
                  onChange={(e) => handleReasonsChange("Другое", e.target.checked)}
                />
              }
              label="Другое"
            />
          </Fade>
          {selectedReasons.includes("Другое") && (
            <Slide in timeout={400} direction="up">
              <TextField
                fullWidth
                required
                label="Укажите причину"
                variant="outlined"
                margin="normal"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:focus-within': {
                    transform: 'translateY(-2px)'
                  }
                }}
              />
            </Slide>
          )}
          <Fade in timeout={1000}>
            <TextField
              fullWidth
              required
              label="Комментарий"
              variant="outlined"
              margin="normal"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={3}
              helperText="Обязательное поле для отклонения"
              sx={{
                transition: 'all 0.3s ease',
                '&:focus-within': {
                  transform: 'translateY(-2px)'
                }
              }}
            />
          </Fade>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={handleClose}
          sx={{ 
            color: theme.palette.text.secondary,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark'
                ? `${theme.palette.text.secondary}20`
                : `${theme.palette.text.secondary}10`,
              transform: 'translateY(-2px)'
            }
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{ 
            backgroundColor: theme.palette.error.main,
            transition: 'all 0.3s ease',
            '&:hover': { 
              backgroundColor: '#c62828',
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 20px ${theme.palette.error.main}40`
            },
            '&:disabled': { 
              backgroundColor: theme.palette.divider,
              transform: 'none'
            },
            fontWeight: 'bold',
            px: 4
          }}
          disabled={
            selectedReasons.length === 0 ||
            (selectedReasons.includes("Другое") && !customReason.trim()) ||
            !comment.trim()
          }
        >
          Отклонить
        </Button>
      </DialogActions>
    </Dialog>
  );
}