import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);
    expect(screen.queryByText(/Add Item/)).toBeNull();
    expect(await screen.findByText(/Add Item/)).toBeInTheDocument();
  });
});
