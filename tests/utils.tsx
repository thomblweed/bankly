import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const renderWithQueryClient = (
  ui: ReactElement,
  options?: RenderOptions,
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    ),
    ...options,
  });
