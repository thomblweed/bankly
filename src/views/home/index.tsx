import { Accounts } from "../../components/accounts";
import { TransactionHistory } from "../../components/transactions";
import { TransactionsProvider } from "../../components/transactions/context";

export const Home = () => (
  <>
    <section>
      <Accounts />
    </section>
    <section>
      <TransactionsProvider>
        <TransactionHistory />
      </TransactionsProvider>
    </section>
  </>
);
