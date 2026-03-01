import { Card, CardMedia } from "@mui/material";

type Props = {
  id: string;
  imageUrl: string;
  selected: boolean;
  onClick: () => void;
};

export const SelectableCardItem = ({ imageUrl, selected, onClick }: Props) => (
  <Card
    onClick={onClick}
    sx={{
      width: "100%",
      height: "100%",
      cursor: "pointer",
      border: selected ? "3px solid #1976d2" : "1px solid #ddd",
      transition: "0.2s",
      "&:hover": { transform: "scale(1.05)" },
    }}
  >
    <CardMedia
      component="img"
      image={imageUrl}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </Card>
);
