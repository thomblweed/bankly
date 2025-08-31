import "./app.css";
import { Home } from "./views/home";

const App = () => (
  <div>
    <header className="header">
      <div className="page-container">
        <img src="/bankly.svg" className="logo" alt="Bankly logo" />
      </div>
    </header>
    <main className="page-container">
      <Home />
    </main>
  </div>
);

export default App;
