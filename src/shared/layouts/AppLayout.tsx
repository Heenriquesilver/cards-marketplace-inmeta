import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  );
};
