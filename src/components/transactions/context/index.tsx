import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { getTransactionsQueryOptions } from "../../../query/options/transactions";

import type { Transaction as TransactionType } from "../../../../types";

type ExpensesTransactionsContextType = {
  expensesTransactions: TransactionType[];
};

type IncomeTransactionsContextType = {
  incomeTransactions: TransactionType[];
};

const ExpensesTransactionsContext =
  createContext<ExpensesTransactionsContextType | null>(null);
const IncomeTransactionsContext =
  createContext<IncomeTransactionsContextType | null>(null);
const TransactionsLoadingContext = createContext<boolean | null>(null);

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useQuery(getTransactionsQueryOptions());

  const expensesTransactionsValue = useMemo(
    () => ({
      expensesTransactions: data?.filter(isExpense) || [],
    }),
    [data],
  );

  const incomeTransactionsValue = useMemo(
    () => ({
      incomeTransactions: data?.filter(isIncome) || [],
    }),
    [data],
  );

  return (
    <TransactionsLoadingContext.Provider value={isLoading}>
      <ExpensesTransactionsContext.Provider value={expensesTransactionsValue}>
        <IncomeTransactionsContext.Provider value={incomeTransactionsValue}>
          {children}
        </IncomeTransactionsContext.Provider>
      </ExpensesTransactionsContext.Provider>
    </TransactionsLoadingContext.Provider>
  );
};

export const useTransactionsLoading = () => {
  const context = useContext(TransactionsLoadingContext);

  if (context == null) {
    throw new Error(
      "useTransactionsLoading must be used within a TransactionsProvider",
    );
  }

  return context;
};

export const useExpensesTransactions = () => {
  const context = useContext(ExpensesTransactionsContext);

  if (!context) {
    throw new Error(
      "useExpensesTransactions must be used within a TransactionsProvider",
    );
  }

  return context;
};

export const useIncomeTransactions = () => {
  const context = useContext(IncomeTransactionsContext);

  if (!context) {
    throw new Error(
      "useIncomeTransactions must be used within a TransactionsProvider",
    );
  }

  return context;
};
