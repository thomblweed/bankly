import type { Transaction as TransactionType } from "../../../types";
import { useTransactionProps } from "./hooks/useTransactionProps";
import { Avatar } from "./avatar";

type Props = {
  transaction: TransactionType;
};

export const Transaction = ({ transaction }: Props) => {
  const { localeEnGbDate, currencyAmount, categoryLabel } =
    useTransactionProps(transaction);

  return (
    <tr>
      <td>
        <div className="transaction-detail">
          <Avatar name={transaction.description} />
          <div className="transaction-description">
            {transaction.description}
            <div className="transaction-category">{categoryLabel}</div>
          </div>
        </div>
      </td>
      <td>
        <div>{localeEnGbDate}</div>
      </td>
      <td className="transaction-amount">
        <div className="amount">{currencyAmount}</div>
      </td>
    </tr>
  );
};
