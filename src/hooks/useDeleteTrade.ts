import { useState } from "react";
import { deleteTrade } from "../services/tradeService";

export const useDeleteTrade = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteTrade = async (id: string, onSuccess: () => void) => {
    try {
      setLoading(true);
      await deleteTrade(id);
      onSuccess();
    } catch {
      setError("Erro ao deletar troca");
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteTrade, loading, error };
};
