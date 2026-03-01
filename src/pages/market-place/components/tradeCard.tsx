import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const isOwner = user?.id === trade.userId;

  const offering = trade.tradeCards.filter((c) => c.type === "OFFERING");
  const receiving = trade.tradeCards.filter((c) => c.type === "RECEIVING");

  const date = new Date(trade.createdAt).toLocaleDateString("pt-BR");

  const handleDelete = async () => {
    if (!confirm("Deseja deletar esta troca?")) return;

    await deleteTrade(trade.id);
    refreshTrades();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: "relative" }}>
      {isOwner && (
        <Tooltip title="Deletar trade">
          <IconButton
            onClick={handleDelete}
            color="error"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      <Box mb={2}>
        <Typography fontWeight="bold">{trade.user.name}</Typography>

        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        <Box flex={1}>
          <Typography fontWeight="bold" color="success.main" mb={1}>
            Oferecer
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

        {/* RECEBENDO */}
        <Box flex={1}>
          <Typography fontWeight="bold" color="primary" mb={1}>
            Receber
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
