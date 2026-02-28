import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Cards Marketplace
        </Typography>

        <Box>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>

              <Button color="inherit" component={Link} to="/register">
                Cadastrar
              </Button>
            </>
          ) : (
            <>
              <Typography component="span" mr={2}>
                {user.name}
              </Typography>

              <Button color="inherit" onClick={logout}>
                Sair
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
