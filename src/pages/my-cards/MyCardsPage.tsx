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
    <Box
      sx={{
        flex: 1,
        p: 3,
        marginLeft: 2,
      }}
    >
      <Typography variant="h4" mb={3}>
        Minhas Cartas
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      )}

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
