import React from "react";
import { getJwtOrganizationId } from "./getJwtOrganizationId";

test("should return null for null", () => {
  expect(getJwtOrganizationId()).toBe(null);
});
test("test valid jwt", () => {
  const payload = { organizationId: "org123" };
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const fakeToken = `header.${encodedPayload}.signature`;

  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(fakeToken);
  const result = getJwtOrganizationId();
  expect(result).toBe("org123");
});

test("invalid token", () => {
  const badJson = "not_json";
  const encodedBadPayload = btoa(badJson)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const fakeToken = `header.${encodedBadPayload}.signature`;

  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(fakeToken);
  const result = getJwtOrganizationId();
  expect(result).toBeNull();
});
