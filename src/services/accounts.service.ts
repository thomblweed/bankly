import type { Account } from "../../types";

export const getAccounts = async () => {
  const response = await fetch("/api/accounts");
  const data = await response.json();

  return data as Account[];
};
