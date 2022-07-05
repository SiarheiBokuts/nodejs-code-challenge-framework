import axios, { AxiosInstance } from "axios";
import { Product } from "../models/providers/product";

export class ProductRatingProvider {
  private axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  async getRatings(productId: Product["productId"]): Promise<number[]> {
    const response = (
      await this.axiosInstance.get("/product-rating", {
        params: {
          productId: productId,
        },
      })
    ).data;

    return response.rating;
  }
}
