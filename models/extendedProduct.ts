import { Currency } from "./currency";
import { Product } from "./providers/product";

export type ExtendedProduct = Product & {
  currency: Currency;
  rating: number;
};
