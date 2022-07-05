import axios, { AxiosInstance } from "axios";
import { Product } from "../models/providers/product.model";

export class ProductsProvider {
  private axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: endpoint,
    });
  }

  async getProducts(): Promise<Product[]> {
    const response = (await this.axiosInstance.get("/products")).data.body;
    return response;
  }
}
