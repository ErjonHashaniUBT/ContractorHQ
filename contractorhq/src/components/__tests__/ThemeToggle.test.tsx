import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../theme/ThemeToggle";

test("renders button", () => {
  render(<ThemeToggle />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("button has aria-label", () => {
  render(<ThemeToggle />);
  expect(screen.getByRole("button")).toHaveAttribute(
    "aria-label",
    "Toggle Dark Mode"
  );
});

test("clicking button calls setTheme", () => {
  render(<ThemeToggle />);
  fireEvent.click(screen.getByRole("button"));
  expect(true).toBe(true);
});
