import type { Transaction } from "../../../../types";
import { displayValueAsCurrency } from "../../../services/currency.service";

export const useTransactionProps = (transaction: Transaction) => {
  const { date, amount, category } = transaction;

  return {
    localeEnGbDate: new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    currencyAmount: displayValueAsCurrency(amount.value, amount.currency_iso),
    categoryLabel: category.replace("_", " "),
  };
};
