import { Currency } from "./currency.model";
import { Product } from "./providers/product.model";

export interface ExtendedProduct extends Product {
  currency: Currency;
  rating: number | null;
}
