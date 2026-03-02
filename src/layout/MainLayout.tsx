import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";

export const MainLayout = () => {
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />

        <Box flex={1}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
