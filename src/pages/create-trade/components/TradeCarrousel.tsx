import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TradeCardCarousel = ({ children }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  return (
    <Box position="relative" width="100%">
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          left: -20,
          top: "40%",
          zIndex: 2,
          bgcolor: "background.paper",
          boxShadow: 2,
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        ref={ref}
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, auto)",
          gap: 2,
          overflowX: "auto",
          px: 4,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {children}
      </Box>

      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          right: -20,
          top: "40%",
          zIndex: 2,
          bgcolor: "background.paper",
          boxShadow: 2,
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};
