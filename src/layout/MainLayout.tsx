import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const MainLayout = () => {
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};
