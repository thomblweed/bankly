import type { Transaction } from "../../types";

export const getAllTransactions = async () => {
  const response = await fetch("/api/transactions");
  const data = await response.json();

  return data as Transaction[];
};
