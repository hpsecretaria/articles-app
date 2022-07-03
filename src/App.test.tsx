import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders truly nav link", () => {
  render(<App />);
  const linkElement = screen.getByText(/truly/i);
  expect(linkElement).toBeInTheDocument();
});
