import type { Account } from "../../../types";
import { displayValueAsCurrency } from "../../services/currency.service";
import "./index.css";

const useAccountItemProps = (account: Account) => {
  const currencyValue = displayValueAsCurrency(
    account.balance.amount.value,
    account.balance.amount.currency,
  );

  return { currencyValue };
};

type Props = {
  account: Account;
};

export const AccountItem = ({ account }: Props) => {
  const { currencyValue } = useAccountItemProps(account);

  return (
    <div className="account">
      <div className="heading total">
        Total {account.balance.amount.currency}
      </div>
      <strong>
        <span className="currencyValue">{currencyValue}</span>
      </strong>
    </div>
  );
};
