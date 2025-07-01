import * as countryService from "./CountryService";

test("should return country", async () => {
  jest
    .spyOn(countryService, "getAllCountries")
    .mockResolvedValue({ id: 1, name: "India", countryCode: "IN" });
  const result = await countryService.getAllCountries();
  expect(result).toEqual({ id: 1, name: "India", countryCode: "IN" });
});
