import { queryOptions } from "@tanstack/react-query";

import { getAllTransactions } from "../../services/transactions.service";

export const getTransactionsQueryOptions = () =>
  queryOptions({
    queryKey: ["get-transactions"],
    queryFn: getAllTransactions,
  });
