import type { Transaction } from "../../types";
import { fetchService } from "./fetch.service";

export const getAllTransactions = async () => {
  const response = await fetchService("/api/transactions");

  return response as Transaction[];
};
