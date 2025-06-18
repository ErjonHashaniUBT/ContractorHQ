import { render, screen, fireEvent } from "@testing-library/react";
import UserProfileClient from "../auth/UserProfileClient";
import { signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const user = {
  _id: "123",
  name: "John Doe",
  email: "john@example.com",
  role: "Admin",
  createdAt: "2023-01-01T00:00:00.000Z",
};

test("renders user info", () => {
  render(<UserProfileClient user={user} />);
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("john@example.com")).toBeInTheDocument();
  expect(screen.getByText("admin")).toBeInTheDocument();
});

test("sign out button calls signOut", () => {
  (signOut as jest.Mock).mockResolvedValueOnce(undefined);
  render(<UserProfileClient user={user} />);
  fireEvent.click(screen.getByText(/sign out/i));
  expect(signOut).toHaveBeenCalledWith({ redirect: false });
});
