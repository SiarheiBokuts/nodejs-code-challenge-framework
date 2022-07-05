import { Currency } from "./models/currency.model";

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

export function getAverageValue(ratings: number[], toFixed = 2) {
  const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return Number(average.toFixed(toFixed));
}
