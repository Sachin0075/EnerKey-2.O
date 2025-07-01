import React from "react";
import { render, screen } from "@testing-library/react";
import ForgotPassword from "./ForgotPassword";
import { MemoryRouter } from "react-router-dom";

// Silence React Router v7 deprecation warnings in tests
jest.spyOn(console, "warn").mockImplementation((msg) => {
  if (
    msg.includes("React Router Future Flag Warning") ||
    msg.includes("Relative route resolution within Splat routes is changing")
  ) {
    return;
  }
  // Uncomment the next line if you want to see other warnings
  // console.warn(msg);
});

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );
});

test("Renders ForgotPassword h2", () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );
  expect(screen.getByText(/forgot your password\?/i)).toBeInTheDocument();
});
