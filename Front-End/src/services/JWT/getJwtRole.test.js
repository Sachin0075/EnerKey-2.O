import { getJwtRole } from "./getJwtRole";
import React from "react";

test("token not present", () => {
  expect(getJwtRole()).toBe(null);
});

test("should validate role", () => {
  const payload = { role: "admin" };
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const fakeToken = `header.${encodedPayload}.signature`;

  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(fakeToken);
  const role = getJwtRole();
  expect(role).toBe("admin");
});

test("should validate role with custom claim", () => {
  const payload = {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "user",
  };
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const fakeToken = `header.${encodedPayload}.signature`;
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(fakeToken);
  const role = getJwtRole();
  expect(role).toBe("user");
});
