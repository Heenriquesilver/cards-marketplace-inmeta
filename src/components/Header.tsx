import { AppBar, Toolbar, Typography, Button, Box, Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
      color: "black",
    },
  };

  return (
    <Box display="flex" flexDirection="column">
      <AppBar position="static" elevation={2}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={navButtonStyle}
            color="inherit"
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
                  sx={navButtonStyle}
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
                  icon={<AccountCircleIcon />}
                  label={user.name.toUpperCase()}
                  sx={{
                    ml: 3,
                    fontWeight: 800,
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
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
    </Box>
  );
};
