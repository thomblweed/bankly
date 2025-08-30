import { Transaction } from "../../../../types";

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      // TODO: requires an error boundary to handle this scenario
      throw new Error(`Unsupported currency: ${currency}`);
  }
};

const amountToCurrencyDisplay = (value: number, currency: string) =>
  `${getCurrencySymbol(currency)}${value}`;

export const useTransactionProps = (transaction: Transaction) => {
  const { date, amount } = transaction;

  return {
    localeEnGbDate: new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    currencyAmount: amountToCurrencyDisplay(amount.value, amount.currency_iso),
  };
};
