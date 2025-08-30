import type { Account } from "../../types";
import { fetchService } from "./fetch.service";

export const getAccounts = async () => {
  const response = await fetchService<Account[]>("/api/accounts");

  return response;
};
