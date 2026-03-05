import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { getMyCards, getAllCards } from "../../services/cardService";
import { SelectableCardItem } from "./components/SelectableCardItem";
import { useCreateTrade } from "../../hooks/useCreateTrade";

import type { Card } from "../../types/types";

const ROWS = 3;
const COLUMNS = 4;
const GAP = 16;

export const CreateTradePage = () => {
  const offeringRef = useRef<HTMLDivElement>(null);
  const receivingRef = useRef<HTMLDivElement>(null);

  const [myCards, setMyCards] = useState<Card[]>([]);
  const [allCards, setAllCards] = useState<Card[]>([]);

  const [offering, setOffering] = useState<string[]>([]);
  const [receiving, setReceiving] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [canLeftOffering, setCanLeftOffering] = useState(false);
  const [canRightOffering, setCanRightOffering] = useState(false);
  const [canLeftReceiving, setCanLeftReceiving] = useState(false);
  const [canRightReceiving, setCanRightReceiving] = useState(false);

  const {
    handleCreateTrade,
    loading: creating,
    error,
    success,
  } = useCreateTrade();

  useEffect(() => {
    const fetch = async () => {
      const my = await getMyCards();
      const all = await getAllCards();
      setMyCards(my);
      setAllCards(all);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateScroll = (
    ref: React.RefObject<HTMLDivElement>,
    type: "offering" | "receiving",
  ) => {
    if (!ref.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    const canLeft = scrollLeft > 0;
    const canRight = scrollLeft + clientWidth < scrollWidth - 5;

    if (type === "offering") {
      setCanLeftOffering(canLeft);
      setCanRightOffering(canRight);
    } else {
      setCanLeftReceiving(canLeft);
      setCanRightReceiving(canRight);
    }
  };

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    dir: "left" | "right",
    type: "offering" | "receiving",
  ) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: dir === "left" ? -ref.current.clientWidth : ref.current.clientWidth,
      behavior: "smooth",
    });

    setTimeout(() => updateScroll(ref, type), 400);
  };

  const toggle = (
    id: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    handleCreateTrade({
      cards: [
        ...offering.map((id) => ({ cardId: id, type: "OFFERING" as const })),
        ...receiving.map((id) => ({ cardId: id, type: "RECEIVING" as const })),
      ],
    });
  };

  const renderSection = (
    title: string,
    cards: Card[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    ref: React.RefObject<HTMLDivElement>,
    type: "offering" | "receiving",
    canLeft: boolean,
    canRight: boolean,
  ) => {
    const itemsPerPage = ROWS * COLUMNS;
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    return (
      <Box
        sx={{
          p: 3,
          height: 650,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Typography variant="h6" mb={2}>
          {title} ({selected.length})
        </Typography>

        <IconButton
          disabled={!canLeft}
          onClick={() => scroll(ref, "left", type)}
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <ArrowBackIos />
        </IconButton>

        <Box
          ref={ref}
          onScroll={() => updateScroll(ref, type)}
          sx={{
            flex: 1,
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: `${totalPages * 100}%`,
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => {
              const pageCards = cards.slice(
                pageIndex * itemsPerPage,
                pageIndex * itemsPerPage + itemsPerPage,
              );

              return (
                <Box
                  key={pageIndex}
                  sx={{
                    width: `${100 / totalPages}%`,
                    display: "grid",
                    gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                    gap: 2,
                    pr: `${GAP}px`,
                  }}
                >
                  {pageCards.map((card) => (
                    <SelectableCardItem
                      key={card.id}
                      {...card}
                      selected={selected.includes(card.id)}
                      onClick={() => toggle(card.id, setSelected)}
                    />
                  ))}
                </Box>
              );
            })}
          </Box>
        </Box>

        <IconButton
          disabled={!canRight}
          onClick={() => scroll(ref, "right", type)}
          sx={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    );
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth={false}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
        sx={{
          flex: 1,
          marginTop: 3,
          marginLeft: 2,
        }}
      >
        <Typography variant="h4">Solicitar Trade</Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">Trade solicitada com sucesso!</Alert>
      )}

      <Box display="flex" gap={3}>
        <Box flex={1} minWidth={0}>
          {renderSection(
            "Oferecer",
            myCards,
            offering,
            setOffering,
            offeringRef,
            "offering",
            canLeftOffering,
            canRightOffering,
          )}
        </Box>

        <Box flex={1} minWidth={0}>
          {renderSection(
            "Receber",
            allCards,
            receiving,
            setReceiving,
            receivingRef,
            "receiving",
            canLeftReceiving,
            canRightReceiving,
          )}
        </Box>
      </Box>

      <Box
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
        bgcolor="background.paper"
        p={2}
        boxShadow={3}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          variant="contained"
          size="large"
          disabled={!offering.length || !receiving.length || creating}
          onClick={handleSubmit}
          sx={{ mr: 3 }}
        >
          {creating ? "Carregando..." : "Confirmar"}
        </Button>
      </Box>
    </Container>
  );
};
