import axios, { AxiosInstance } from "axios";
import { Currency } from "../models/currency";
import { Product } from "../models/providers/product";

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
    const response = (
      await this.axiosInstance.get("/product-challenge-price", {
        params: {
          price: price,
          toCurrency: toCurrency,
        },
      })
    ).data;

    return response.price;
  }
}
