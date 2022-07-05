import axios, { AxiosInstance } from "axios";
import { Currency } from "../models/currency.model";
import { Product } from "../models/providers/product.model";

export class ProductPriceProvider {
  private axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  async getPrice(
    price: Product["price"],
    toCurrency: Currency
  ): Promise<number> {
    const convertedPrice = (
      await this.axiosInstance.get("/product-challenge-price", {
        params: {
          price: price,
          toCurrency: toCurrency,
        },
      })
    ).data.price;

    return convertedPrice;
  }
}
