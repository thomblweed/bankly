import { useQuery } from "@tanstack/react-query";

import { accountsQueryOptions } from "../../query/options/accounts";

import { AccountItem } from "./item";
import "./index.css";

export const Accounts = () => {
  const { data: accounts } = useQuery(accountsQueryOptions());

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <div className="accounts">
        {accounts?.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
    </>
  );
};
