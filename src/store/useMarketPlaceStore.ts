import { create } from "zustand";
import type { Trade } from "../types/types";
import { getTrades } from "../services/getTrades";

interface State {
  trades: Trade[];
  loading: boolean;
  fetchTrades: () => Promise<void>;
}

export const useMarketplaceStore = create<State>((set) => ({
  trades: [],
  loading: false,

  fetchTrades: async () => {
    try {
      set({ loading: true });

      const trades = await getTrades();

      set({ trades });
    } catch (error) {
      console.error("Erro ao buscar trades", error);
    } finally {
      set({ loading: false });
    }
  },
}));
