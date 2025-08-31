import * as Tabs from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

import { Loading } from "../loading";
import "./index.css";
import { Transaction } from "./item";
import {
  useExpensesTransactions,
  useIncomeTransactions,
  useTransactionsStatus,
} from "./context";

const ThreeColumnLayout = ({ children }: { children: ReactNode }) => (
  <tr>
    <td colSpan={3}>{children}</td>
  </tr>
);

const ExpensesTransactionsBody = () => {
  const { expensesTransactions } = useExpensesTransactions();
  const { isLoading, error } = useTransactionsStatus();

  return isLoading ? (
    <ThreeColumnLayout>
      <Loading />
    </ThreeColumnLayout>
  ) : (
    <>
      {expensesTransactions.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.id} />
      ))}
      {error ? (
        <ThreeColumnLayout>
          <p className="errorText">
            There has been error in retrieving your expenses transactions
          </p>
        </ThreeColumnLayout>
      ) : null}
    </>
  );
};

const Expenses = () => {
  return (
    <table aria-label="Expenses">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <ExpensesTransactionsBody />
      </tbody>
    </table>
  );
};

const IncomeTransactionsBody = () => {
  const { incomeTransactions } = useIncomeTransactions();

  return incomeTransactions.map((transaction) => (
    <Transaction transaction={transaction} key={transaction.id} />
  ));
};

const Income = () => {
  return (
    <table aria-label="Income">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <IncomeTransactionsBody />
      </tbody>
    </table>
  );
};

export const TransactionHistory = () => {
  return (
    <>
      <h1 className="align-left">Transaction history</h1>
      <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <Expenses />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <Income />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};
