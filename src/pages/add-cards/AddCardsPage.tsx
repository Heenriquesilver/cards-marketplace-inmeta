import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";

import { getAllCards } from "../../services/cardService";
import { useCardsStore } from "../../store/useCardStore";
import { CardItem } from "../market-place/components/cardItem";
import type { Card } from "../../types/types";

export const AddCardsPage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);

  const { addCard } = useCardsStore();

  useEffect(() => {
    getAllCards()
      .then((data) => setCards(data))
      .catch(() => setError("Erro ao carregar cartas"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (id: string) => {
    try {
      setError("");
      setSuccess("");
      setAddingId(id);

      await addCard(id);

      setSuccess("Carta adicionada com sucesso!");
    } catch {
      setError("Erro ao adicionar carta.");
    } finally {
      setAddingId(null);
    }
  };

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
      <Typography variant="h4" mb={3}>
        Adicionar cartas
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card.id}>
            <Box textAlign="center">
              <CardItem name={card.name} imageUrl={card.imageUrl} />

              <Button
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => handleAdd(card.id)}
                disabled={addingId === card.id}
              >
                {addingId === card.id ? (
                  <CircularProgress size={18} />
                ) : (
                  "Adicionar"
                )}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
