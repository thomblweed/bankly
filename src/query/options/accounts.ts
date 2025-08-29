import { queryOptions } from "@tanstack/react-query";

import { getAccounts } from "../../services/accounts.service";

export const getAccountsQueryOptions = () =>
  queryOptions({
    queryKey: ["get-accounts"],
    queryFn: getAccounts,
  });
