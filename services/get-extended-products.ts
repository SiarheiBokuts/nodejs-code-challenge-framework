import bluebird from "bluebird";
import { Currency } from "../models/currency.model";
import { Product } from "../models/providers/product.model";
import { ProductRatingProvider } from "../providers/product-rating.provider";
import { ProductPriceProvider } from "../providers/product-price.provider";
import { ProductsProvider } from "../providers/products.provider";
import * as helpers from "../helpers";
import { ExtendedProduct } from "../models/extended-product.model";

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

    // const productsInfo: [number, number[]][] = await bluebird.map(
    //   products,
    //   async (product) => {
    //     console.log(new Date().toISOString());
    //     await bluebird.delay(Math.random() * 10000);
    //     let a = {
    //       [product.productId]: {
    //         price: useDefaultPrice
    //           ? await Promise.resolve(product.price)
    //           : await this.productPriceProvider.getPrice(
    //               product.price,
    //               toCurrency
    //             ),
    //         ratings: await this.productRatingProvider.getRatings(
    //           product.productId
    //         ),
    //       },
    //     } as any;
    //     console.log("finished = ", new Date().toISOString());
    //     return a;
    //   },
    //   { concurrency: 5 }
    // );

    const productsInfo: [number, number[]][] = await bluebird.map(
      products,
      async (product) => {
        return Promise.all([
          // optimization. if our products already have needed currency then we can just skip api call and return price from the product itself
          useDefaultPrice
            ? Promise.resolve(product.price)
            : this.productPriceProvider.getPrice(product.price, toCurrency),
          this.productRatingProvider.getRatings(product.productId),
        ]);
      },
      { concurrency: 10 }
    );

    // BETTER
    // const productsInfoWithFormat: {
    //   [productId: number]: { price: number; ratings: number[] };
    // } = products.reduce<{
    //   [productId: number]: { price: number; ratings: number[] };
    // }>((prevV, currV, index) => {
    //   prevV[currV.productId] = {
    //     price: productsInfo[index][0],
    //     ratings: productsInfo[index][1],
    //   };
    //   return prevV;
    // }, {});

    // console.log(productsInfoWithFormat);

    return productsInfo;
  }
}
