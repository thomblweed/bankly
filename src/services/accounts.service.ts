import type { Account } from "../../types";
import { fetchService } from "./fetch.service";

export const getAccounts = async () => {
  const response = await fetchService("/api/accounts");

  return response as Account[];
};
