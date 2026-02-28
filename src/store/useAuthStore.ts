import { create } from "zustand";
import { getMe } from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  setAuth: (data: { user: User; token: string }) => void;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: true,

  setAuth: ({ user, token }) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    try {
      const user = await getMe();
      set({ user });
    } finally {
      set({ loading: false });
    }
  },
}));
