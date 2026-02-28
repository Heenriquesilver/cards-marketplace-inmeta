import { create } from "zustand";
import type { Card } from "../types/types";
import { getMyCards, addCardToUser } from "../services/cardService";

interface State {
  myCards: Card[];
  loading: boolean;

  fetchMyCards: () => Promise<void>;
  addCard: (cardId: string) => Promise<void>;
}

export const useCardsStore = create<State>((set) => ({
  myCards: [],
  loading: false,

  fetchMyCards: async () => {
    set({ loading: true });
    const data = await getMyCards();
    set({ myCards: data, loading: false });
  },

  addCard: async (cardId) => {
    await addCardToUser(cardId);

    set((state) => ({
      myCards: [...state.myCards, { id: cardId } as Card],
    }));
  },
}));
