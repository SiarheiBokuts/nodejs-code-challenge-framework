import { Currency } from "./models/currency";

export function getCorrectCurrency(
  currency: any,
  defaultCurrency: Currency
): Currency {
  if (Object.values(Currency).includes(currency)) {
    return currency;
  } else {
    return defaultCurrency;
  }
}
