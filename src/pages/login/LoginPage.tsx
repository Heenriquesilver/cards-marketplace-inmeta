import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData, loginSchema } from "../../schemas/loginSchema";
import { loginRequest } from "../../services/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");

      const response = await loginRequest(data);

      setAuth(response);

      navigate("/");
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Senha"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Entrar"}
          </Button>

          <Typography variant="body2">
            Não tem conta? <Link to="/register">Cadastre-se</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
