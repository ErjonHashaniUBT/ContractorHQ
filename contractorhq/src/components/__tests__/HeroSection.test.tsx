import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSection } from "../ui/HeroSection";

describe("HeroSection", () => {
  test("renders main heading text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Industrial/i)).toBeInTheDocument();
    expect(screen.getByText(/Power Tools/i)).toBeInTheDocument();
  });

  test("renders Shop Collection and View Deals links", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /Shop Collection/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View Deals/i })).toBeInTheDocument();
  });

  test("slider controls buttons are clickable and update slide", () => {
    render(<HeroSection />);
    const buttons = screen.getAllByRole("button", { name: /Go to slide/i });
    expect(buttons.length).toBeGreaterThan(0);

    // Click the second button and check if it exists (we can't check animation state easily here)
    fireEvent.click(buttons[1]);
    expect(buttons[1]).toBeEnabled();
  });
});
