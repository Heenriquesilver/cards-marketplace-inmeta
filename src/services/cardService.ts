import { api } from "../api/axios";
import type { Card } from "../types/types";

export const getMyCards = async (): Promise<Card[]> => {
  const response = await api.get("/me/cards");
  return response.data;
};

export const addCardToUser = async (cardId: string) => {
  await api.post("/me/cards", {
    cardIds: [cardId],
  });
};

export const getAllCards = async (page = 1) => {
  const response = await api.get("/cards?rpp=20&page=" + page);
  return response.data.list;
};
