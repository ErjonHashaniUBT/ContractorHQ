import { render, screen } from "@testing-library/react";
import CustomerReviews from "../ui/CustomerReviews";

describe("CustomerReviews", () => {
  test("renders star icons", () => {
    const { container } = render(<CustomerReviews />);
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBeGreaterThanOrEqual(15);
  });

  test("renders the heading 'Customer Reviews'", () => {
    render(<CustomerReviews />);
    const heading = screen.getByRole("heading", { name: /customer reviews/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders at least one customer review text", () => {
    render(<CustomerReviews />);
    const reviewText = screen.getByText(/contractorhq is my go-to/i);
    expect(reviewText).toBeInTheDocument();
  });
});
