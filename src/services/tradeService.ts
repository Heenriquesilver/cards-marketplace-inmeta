import { api } from "../api/axios";
import type { CreateTradePayload } from "../types/types";

export const createTrade = async (payload: CreateTradePayload) => {
  const { data } = await api.post("/trades", payload);
  return data;
};

export const deleteTrade = async (id: string) => {
  await api.delete(`/trades/${id}`);
};
