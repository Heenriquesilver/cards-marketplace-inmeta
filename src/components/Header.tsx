import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
        >
          Cards Marketplace
        </Typography>

        {/* MENU */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* VISÍVEL PARA TODOS */}
          <Button color="inherit" component={Link} to="/">
            Marketplace
          </Button>

          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>

              <Button
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff" }}
                component={Link}
                to="/register"
              >
                Cadastrar
              </Button>
            </>
          ) : (
            <>
              {/* ÁREA LOGADA */}
              <Button color="inherit" component={Link} to="/my-cards">
                Minhas cartas
              </Button>

              <Button color="inherit" component={Link} to="/add-cards">
                Adicionar cartas
              </Button>

              <Button color="inherit" component={Link} to="/new-trade">
                Nova troca
              </Button>

              <Typography mx={1}>{user.name}</Typography>

              <Button color="inherit" onClick={handleLogout}>
                Sair
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
