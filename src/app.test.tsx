import { render, screen } from "@testing-library/react";
import App from "./app";

import { renderWithQueryClient, testQueryClient } from "../tests/utils";

afterEach(() => {
  testQueryClient.clear();
});

it("App renders without crashing", () => {
  renderWithQueryClient(<App />);

  expect(screen.getByText("Your accounts")).toBeInTheDocument();
});
