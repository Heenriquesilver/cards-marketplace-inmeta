import { Card, CardMedia, Typography, Box } from "@mui/material";

interface Props {
  name: string;
  imageUrl: string;
}

export const CardItem = ({ name, imageUrl }: Props) => {
  return (
    <Card sx={{ width: 120, height: 265, backgroundColor: "#E3F2FD" }}>
      <CardMedia
        component="img"
        height="170"
        image={imageUrl}
        alt={name}
        sx={{ marginTop: "25px" }}
      />

      <Box p={1}>
        <Typography variant="caption" fontWeight="bold">
          {name}
        </Typography>
      </Box>
    </Card>
  );
};
