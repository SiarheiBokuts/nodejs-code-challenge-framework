import bluebird from "bluebird";
import { Currency } from "../models/currency";
import { ExtendedProduct } from "../models/extendedProduct";
import { Product } from "../models/providers/product";
import { ProductRatingProvider } from "../providers/product-rating.provider";
import { ProductPriceProvider } from "../providers/products-price.provider";
import { ProductsProvider } from "../providers/products.provider";
import * as helpers from "../helpers";

export class GetExtendedProducts {
  productsProvider: ProductsProvider;
  productPriceProvider: ProductPriceProvider;
  productRatingProvider: ProductRatingProvider;

  constructor() {
    this.productsProvider = new ProductsProvider(
      process.env.PRODUCTS_PROVIDER_ENDPOINT
    );
    this.productPriceProvider = new ProductPriceProvider(
      process.env.PRODUCT_PRICE_PROVIDER_ENDPOINT
    );
    this.productRatingProvider = new ProductRatingProvider(
      process.env.PRODUCT_RATING_PROVIDER_ENDPOINT
    );
  }

  async getExtendedProducts(
    toCurrency: Currency,
    defaultProductsCurrency: Currency
  ) {
    const products = await this.productsProvider.getProducts();

    const productsInfo = await this.getProductsInfo(
      products,
      toCurrency,
      defaultProductsCurrency
    );

    const extendedProducts: ExtendedProduct[] = products.map(
      (product, index) => {
        const productInfo = productsInfo[index];
        return {
          ...product,
          price: productInfo[0],
          currency: toCurrency,
          rating: helpers.getAverageValue(productInfo[1]),
        };
      }
    );

    return extendedProducts;
  }

  private async getProductsInfo(
    products: Product[],
    toCurrency: Currency,
    defaultProductsCurrency: Currency
  ) {
    const useDefaultPrice = toCurrency === defaultProductsCurrency;

    const productsInfo = await bluebird.map(
      products,
      async (product) => {
        return Promise.all([
          // optimization. if our products already have needed currency then we can just skip api call and return price from the product itself
          useDefaultPrice
            ? Promise.resolve(product.price)
            : this.productPriceProvider.getPrice(
                product.price,
                Currency.NorwegianKrone
              ),
          this.productRatingProvider.getRatings(product.productId),
        ]);
      },
      { concurrency: 10 }
    );

    return productsInfo;
  }
}
