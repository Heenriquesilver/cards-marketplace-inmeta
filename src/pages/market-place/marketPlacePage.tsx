import { useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useMarketplaceStore } from "../../store/useMarketPlaceStore";
import { TradeCard } from "./components/tradeCard";

export const MarketplacePage = () => {
  const { trades, fetchTrades, loading } = useMarketplaceStore();

  useEffect(() => {
    fetchTrades();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        marginLeft: 2,
      }}
    >
      <Typography variant="h4" mb={4}>
        Marketplace de Trocas
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        {trades.map((trade) => (
          <TradeCard key={trade.id} trade={trade} refreshTrades={fetchTrades} />
        ))}
      </Box>
    </Box>
  );
};
