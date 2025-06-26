import { sum } from "./ResourceCards";
import React from "react";
test("Sum the two numbers", () => {
  expect(sum(2, 4)).toBe(6);
});
