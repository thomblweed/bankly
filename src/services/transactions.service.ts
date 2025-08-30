import type { Transaction } from "../../types";
import { fetchService } from "./fetch.service";

export const getAllTransactions = async () => {
  const response = await fetchService<Transaction[]>("/api/transactions");

  return response;
};
