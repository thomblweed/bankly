import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { renderWithQueryClient, testQueryClient } from "../../../tests/utils";
import { TransactionsProvider } from "./context";
import { TransactionHistory } from ".";
import { server } from "../../../vitest-setup";
import { http, HttpResponse } from "msw";

const user = userEvent.setup();

const TransactionHistoryWithTransactionsProvider = () => (
  <TransactionsProvider>
    <TransactionHistory />
  </TransactionsProvider>
);

describe("transaction history", () => {
  afterEach(() => {
    testQueryClient.clear();
    server.resetHandlers();
  });

  test("the expenses tab should be shown by default", async () => {
    renderWithQueryClient(<TransactionHistoryWithTransactionsProvider />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("cell", { name: "Loading..." }),
    );

    expect(screen.getByText("-€20.25")).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "24 June 2022" }),
    ).toBeInTheDocument();
  });

  it("should display an error to the user when there is an api error", async () => {
    server.use(
      http.get("/api/transactions", () =>
        HttpResponse.json({ error: "API error" }, { status: 500 }),
      ),
    );

    renderWithQueryClient(<TransactionHistoryWithTransactionsProvider />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("cell", { name: "Loading..." }),
    );

    expect(
      screen.getByText(
        "There has been error in retrieving your expenses transactions",
      ),
    ).toBeInTheDocument();
  });

  test("changing between the expenses and income tabs should show different transactions", async () => {
    renderWithQueryClient(<TransactionHistoryWithTransactionsProvider />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("cell", { name: "Loading..." }),
    );

    expect(screen.getByText("-€20.25")).toBeInTheDocument();

    await user.click(incomeTabTrigger);

    expect(incomeTabTrigger).toHaveAttribute("data-state", "active");
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
    expect(screen.queryByText("-€20.25")).not.toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "£510.55" })).toBeInTheDocument();
  });
});
