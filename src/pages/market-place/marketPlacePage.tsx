import { useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useMarketplaceStore } from "../../store/useMarketPlaceStore";
import { TradeCard } from "./components/tradeCard";

export const MarketplacePage = () => {
  const { trades, fetchTrades, loading } = useMarketplaceStore();

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Marketplace de Trocas
      </Typography>

      {loading && <CircularProgress />}

      {!loading && trades.length === 0 && (
        <Typography>Nenhuma troca disponível.</Typography>
      )}

      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </Box>
  );
};
