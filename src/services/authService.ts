import { api } from "../api/axios";

interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const loginRequest = async (data: LoginPayload) => {
  const response = await api.post<LoginResponse>("/login", data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};

export const registerRequest = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/register", data);
  return response.data;
};
