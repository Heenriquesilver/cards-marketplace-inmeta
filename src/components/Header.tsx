import { AppBar, Toolbar, Typography, Button, Box, Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navButtonStyle = {
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 2,
    px: 2,
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
    },
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LOGO */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          Cards Marketplace
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Button sx={navButtonStyle} color="inherit" component={Link} to="/">
            Marketplace
          </Button>

          {!user ? (
            <>
              <Button
                sx={navButtonStyle}
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>

              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  ml: 1,
                }}
              >
                Cadastrar
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={navButtonStyle}
                color="inherit"
                component={Link}
                to="/my-cards"
              >
                Minhas cartas
              </Button>

              <Button
                sx={navButtonStyle}
                color="inherit"
                component={Link}
                to="/add-cards"
              >
                Adicionar cartas
              </Button>

              <Button
                sx={navButtonStyle}
                color="inherit"
                component={Link}
                to="/create-trade"
              >
                Nova troca
              </Button>

              <Chip
                label={user.name}
                sx={{
                  ml: 1,
                  fontWeight: 800,
                }}
              />

              <Button
                sx={navButtonStyle}
                color="inherit"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
