import { api } from "../api/axios";
import type { Trade } from "../types/types";

interface Response {
  list: Trade[];
}

export const getTrades = async () => {
  const { data } = await api.get<Response>("/trades", {
    params: { page: 1, rpp: 10 },
  });

  return data.list;
};
