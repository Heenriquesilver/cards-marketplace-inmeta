import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

import type { Trade } from "../../../types/types";
import { CardItem } from "./cardItem";
import { deleteTrade } from "../../../services/tradeService";
import { useAuthStore } from "../../../store/useAuthStore";

interface Props {
  trade: Trade;
  refreshTrades: () => void;
}

export const TradeCard = ({ trade, refreshTrades }: Props) => {
  const { user } = useAuthStore();

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const isOwner = user?.id === trade.userId;

  const offering = trade.tradeCards.filter((c) => c.type === "OFFERING");
  const receiving = trade.tradeCards.filter((c) => c.type === "RECEIVING");

  const formattedDate = new Date(trade.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleDelete = async () => {
    const confirmed = window.confirm("Deseja deletar esta troca?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await deleteTrade(trade.id);

      refreshTrades();
    } catch (err) {
      console.error(err);
      setError("Erro ao deletar trade.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        position: "relative",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      {isOwner && (
        <Tooltip title="Deletar trade">
          <span>
            <IconButton
              onClick={handleDelete}
              color="error"
              disabled={deleting}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              {deleting ? <CircularProgress size={20} /> : <DeleteIcon />}
            </IconButton>
          </span>
        </Tooltip>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box mb={2}>
        <Typography fontWeight="bold">{trade.user.name}</Typography>

        <Typography variant="caption" color="text.secondary">
          {formattedDate}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        <Box flex={1}>
          <Typography fontWeight="bold" color="success.main" mb={1}>
            Oferecer ({offering.length})
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap">
            {offering.map((item) => (
              <CardItem
                key={item.id}
                name={item.card.name}
                imageUrl={item.card.imageUrl}
              />
            ))}
          </Box>
        </Box>

        <Box flex={1}>
          <Typography fontWeight="bold" color="primary.main" mb={1}>
            Receber ({receiving.length})
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap">
            {receiving.map((item) => (
              <CardItem
                key={item.id}
                name={item.card.name}
                imageUrl={item.card.imageUrl}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
