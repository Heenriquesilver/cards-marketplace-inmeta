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
import { useNavigate, Link } from "react-router-dom";

import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/registerSchema";

import { registerRequest } from "../../services/authService";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError("");

      await registerRequest(data);

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setError("Erro ao criar usuário. Tente novamente.");
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Paper sx={{ p: 4, width: 400 }}>
        <Button onClick={() => navigate(-1)}>← Voltar</Button>

        <Typography variant="h5" mb={2}>
          Cadastro
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Usuário criado com sucesso! Redirecionando para o login...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Nome"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

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
            {isSubmitting ? <CircularProgress size={24} /> : "Cadastrar"}
          </Button>

          <Typography variant="body2">
            Já tem conta? <Link to="/login">Fazer login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
