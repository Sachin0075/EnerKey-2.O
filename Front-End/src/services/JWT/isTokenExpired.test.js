import React from "react";
import { isTokenExpired } from "./isTokenExpired";

test("should be true if token missing", () => {
  expect(isTokenExpired(null)).toBe(true);
  expect(isTokenExpired("")).toBe(true);
  expect(isTokenExpired(undefined)).toBe(true);
  expect(isTokenExpired(NaN)).toBe(true);
  expect(isTokenExpired(0)).toBe(true);
  expect(isTokenExpired(false)).toBe(true);
  expect(isTokenExpired([])).toBe(true);
  expect(isTokenExpired({})).toBe(true);
});

test("should validate token", () => {
  const payload = { exp: Math.floor(Date.now() / 1000) + 60 }; // valid for 60 seconds
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const fakeToken = `header.${encodedPayload}.signature`;

  expect(isTokenExpired(fakeToken)).toBe(false); //
});
