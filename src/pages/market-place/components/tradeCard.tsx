import { Box, Card, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import type { Trade } from "../../../types/types";
import { CardItem } from "./cardItem";

interface Props {
  trade: Trade;
}

export const TradeCard = ({ trade }: Props) => {
  const offering = trade.tradeCards.filter((c) => c.type === "OFFERING");
  const receiving = trade.tradeCards.filter((c) => c.type === "RECEIVING");

  const date = new Date(trade.createdAt).toLocaleDateString("pt-BR");

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box mb={2}>
        <Typography fontWeight="bold">{trade.user.name}</Typography>

        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography fontWeight="bold" color="success.main" mb={1}>
            Oferecendo
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography fontWeight="bold" color="primary" mb={1}>
            Quer receber
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
        </Grid>
      </Grid>
    </Card>
  );
};
