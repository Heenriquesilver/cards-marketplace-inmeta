import { useState } from "react";
import { createTrade } from "../services/tradeService";
import type { CreateTradePayload } from "../types/types";

export const useCreateTrade = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateTrade = async (payload: CreateTradePayload) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createTrade(payload);

      setSuccess("Troca criada com sucesso 🎉");
    } catch {
      setError("Não é possivel trocar a mesma carta.");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateTrade, loading, error, success };
};
