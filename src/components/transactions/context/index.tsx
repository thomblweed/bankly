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
const TransactionsStatusContext = createContext<{
  isLoading: boolean;
  error: Error | null;
} | null>(null);

const isExpense = (transaction: TransactionType) =>
  transaction.amount.value < 0;
const isIncome = (transaction: TransactionType) => transaction.amount.value > 0;

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery(getTransactionsQueryOptions());

  const expensesTransactionsValue = useMemo(
    () => ({
      expensesTransactions: error ? [] : data?.filter(isExpense) || [],
    }),
    [data, error],
  );

  const incomeTransactionsValue = useMemo(
    () => ({
      incomeTransactions: error ? [] : data?.filter(isIncome) || [],
    }),
    [data, error],
  );

  const transactionsStatusValue = useMemo(
    () => ({
      isLoading,
      error,
    }),
    [isLoading, error],
  );

  return (
    <TransactionsStatusContext.Provider value={transactionsStatusValue}>
      <ExpensesTransactionsContext.Provider value={expensesTransactionsValue}>
        <IncomeTransactionsContext.Provider value={incomeTransactionsValue}>
          {children}
        </IncomeTransactionsContext.Provider>
      </ExpensesTransactionsContext.Provider>
    </TransactionsStatusContext.Provider>
  );
};

export const useTransactionsStatus = () => {
  const context = useContext(TransactionsStatusContext);

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
