import { getJwtSub } from "./getJwtSub";
import React from "react";

afterEach(() => {
  jest.restoreAllMocks();
});

test("token is not there", () => {
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  const result = getJwtSub();
  expect(result).toBe(null);
});

test("should validate sub", () => {
  const payload = { sub: "user123" };
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const faketoken = `header.${encodedPayload}.signature`;
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(faketoken);
  const result = getJwtSub();
  expect(result).toBe("user123");
});

test("should validate invalid", () => {
  // Use a payload that is not valid base64 JSON
  const faketoken = `header.aW52YWxpZF9qc29u.signature`;
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(faketoken);
  expect(getJwtSub()).toBeNull();
});
