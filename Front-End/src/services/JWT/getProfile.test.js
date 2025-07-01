import React from "react";
import getProfile from "./getProfile";
import axios from "axios";
jest.mock("axios");
describe("getProfile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should first", async () => {
    const result = await getProfile();
    expect(result).toBeNull();
  });

  test("should getprofile", async () => {
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(
        "Bearer faketoken.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIn0.fakeSignature"
      );
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        data: { organizationId: "10944408-bc19-4f69-8462-291557418eda" },
      },
    });

    const result = await getProfile();
    expect(result).toBe("10944408-bc19-4f69-8462-291557418eda");
  });
});
