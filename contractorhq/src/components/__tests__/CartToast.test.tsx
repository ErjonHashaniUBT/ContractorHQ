import { render, screen, fireEvent } from "@testing-library/react";
import { CartToast } from "../ui/CartToast";
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  dismiss: jest.fn(),
}));

test("shows product name and quantity", () => {
  render(<CartToast productName="Test Product" quantity={3} toastId="1" />);
  expect(screen.getByText('3 × "Test Product"')).toBeInTheDocument();
});

test("shows Close button", () => {
  render(<CartToast productName="Test" quantity={1} toastId="1" />);
  expect(screen.getByText("Close")).toBeInTheDocument();
});

test("calls toast.dismiss when Close clicked", () => {
  render(<CartToast productName="Test" quantity={1} toastId="1" />);
  fireEvent.click(screen.getByText("Close"));
  expect(toast.dismiss).toHaveBeenCalledWith("1");
});


