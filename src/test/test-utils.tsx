import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../styles/theme";
import { BrowserRouter } from "react-router";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
