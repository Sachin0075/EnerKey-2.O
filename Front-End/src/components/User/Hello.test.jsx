/* eslint-env jest */
// src/components/Hello.test.jsx
import { render, screen } from "@testing-library/react";
import Hello from "../Hello";
import React from "react";

test("renders greeting with name", () => {
  render(<Hello name="Sachin" />);
  expect(screen.getByText("Hello, Sachin!")).toBeInTheDocument();
});
