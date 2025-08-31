const getLocaleForCurrency = (currency: string) => {
  switch (currency) {
    case "USD":
      return "en-US";
    case "EUR":
      return "en-GB";
    case "GBP":
      return "en-GB";
    default:
      // TODO: requires an error boundary to handle this scenario
      throw new Error(`Unsupported currency: ${currency}`);
  }
};

export const displayValueAsCurrency = (value: number, currency: string) => {
  const locale = getLocaleForCurrency(currency);

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};
