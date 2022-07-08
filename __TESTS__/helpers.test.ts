import * as helpers from "../helpers";
import { Currency } from "../models/currency.model";

describe("helpers test", () => {
  test("getAverageValue", () => {
    expect(helpers.getAverageValue([8, 2, 11])).toBe(7);
    expect(helpers.getAverageValue([])).toBe(null);
    expect(helpers.getAverageValue("fafa" as any)).toBe(null);
    expect(helpers.getAverageValue([3, 3, 4])).toBe(3.33);
    expect(helpers.getAverageValue([3, 3, 4], 3)).toBe(3.333);
  });
  test("getCorrectCurrency", () => {
    expect(
      helpers.getCorrectCurrency(Currency.NorwegianKrone, Currency.DanishKrone)
    ).toBe(Currency.NorwegianKrone);
    expect(
      helpers.getCorrectCurrency("wrongCurrency", Currency.DanishKrone)
    ).toBe(Currency.DanishKrone);
  });
});
