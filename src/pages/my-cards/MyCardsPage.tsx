import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { useCardsStore } from "../../store/useCardStore";
import { MyCardItem } from "./components/MyCardItem";

export const MyCardsPage = () => {
  const { myCards, fetchMyCards, loading } = useCardsStore();

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Minhas Cartas
      </Typography>

      {loading && <CircularProgress />}

      {!loading && myCards.length === 0 && (
        <Typography>Você ainda não possui cartas.</Typography>
      )}

      <Grid container spacing={2}>
        {myCards.map((card) => (
          <Grid item key={card.id}>
            <MyCardItem card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
