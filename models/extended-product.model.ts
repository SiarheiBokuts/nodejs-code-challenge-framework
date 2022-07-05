import { Currency } from "./currency.model";
import { Product } from "./providers/product.model";

export type ExtendedProduct = Product & {
  currency: Currency;
  rating: number;
};
