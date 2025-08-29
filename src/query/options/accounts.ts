import { queryOptions } from "@tanstack/react-query";

import { getAccounts } from "../../services/accounts.service";

export const accountsQueryOptions = () =>
  queryOptions({
    queryKey: ["get-accounts"],
    queryFn: getAccounts,
  });
