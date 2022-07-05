import axios, { AxiosInstance } from "axios";
import { Product } from "../models/providers/product.model";

export class ProductRatingProvider {
  private axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  async getRatings(productId: Product["productId"]): Promise<number[]> {
    const ratings = (
      await this.axiosInstance.get("/product-rating", {
        params: {
          productId: productId,
        },
      })
    ).data.rating;

    return ratings;
  }
}
