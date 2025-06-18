import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ui/ProductCard";

const product = {
  _id: "1",
  name: "Test Product",
  price: 99.99,
  image: "/test.jpg",
  isOnSale: true,
  category: "Tools",
};

test("renders product name", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText("Test Product")).toBeInTheDocument();
});

test("renders price correctly", () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText("$99.99")).toBeInTheDocument();
});

test("renders Add button and is clickable", () => {
  render(<ProductCard product={product} />);
  const addButton = screen.getByRole("button", { name: /add/i });
  expect(addButton).toBeInTheDocument();
  fireEvent.click(addButton);
});
