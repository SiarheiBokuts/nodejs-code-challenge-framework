import { Currency } from "../models/currency";
import { Product } from "../models/providers/product";
import { ProductRatingProvider } from "../providers/product-rating.provider";
import { ProductPriceProvider } from "../providers/products-price.provider";
import { ProductsProvider } from "../providers/products.provider";
import { GetExtendedProducts } from "../services/getExtendedProducts";

describe("GetExtendedProducts tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should extends products", async () => {
    const { getProductsMock, getPriceMock, getRatingsMock } = getMocks();

    const extendedProducts =
      await new GetExtendedProducts().getExtendedProducts(
        Currency.DanishKrone,
        Currency.NorwegianKrone
      );

    expect(getProductsMock.mock.calls.length).toBe(1);
    expect(getPriceMock.mock.calls.length).toBe(3);
    expect(getRatingsMock.mock.calls.length).toBe(3);

    expect(extendedProducts.length).toBe(3);

    // check that extendedProduct have all props from default product
    for (let i = 0; i < mockedProducts.length; i++) {
      const mockedProduct = mockedProducts[i];
      const extendedProduct = extendedProducts[i];
      const mockedProductKeys: Array<keyof Product> = Object.keys(
        mockedProduct
      ) as unknown as Array<keyof Product>;

      for (let j = 0; j < mockedProductKeys.length; j++) {
        const propName = mockedProductKeys[j];
        const propValue = mockedProduct[propName];
        expect(extendedProduct).toHaveProperty(propName);
        if (propName !== "price") {
          expect(extendedProduct[propName]).toBe(propValue);
        }
      }
    }

    expect(extendedProducts[0].price).toBe(100);
    expect(extendedProducts[1].price).toBe(200);
    expect(extendedProducts[2].price).toBe(300);

    expect(extendedProducts[0].currency).toBe(Currency.DanishKrone);
    expect(extendedProducts[1].currency).toBe(Currency.DanishKrone);
    expect(extendedProducts[2].currency).toBe(Currency.DanishKrone);

    expect(extendedProducts[0].rating).toBe(2);
    expect(extendedProducts[1].rating).toBe(1);
    expect(extendedProducts[2].rating).toBe(4);
  });

  test("optimization should works", async () => {
    const { getProductsMock, getPriceMock, getRatingsMock } = getMocks();

    const extendedProducts =
      await new GetExtendedProducts().getExtendedProducts(
        Currency.DanishKrone,
        Currency.DanishKrone
      );

    expect(getProductsMock.mock.calls.length).toBe(1);
    expect(getPriceMock.mock.calls.length).toBe(0);
    expect(getRatingsMock.mock.calls.length).toBe(3);

    expect(extendedProducts.length).toBe(3);

    expect(extendedProducts[0].price).toBe(502);
    expect(extendedProducts[1].price).toBe(653);
    expect(extendedProducts[2].price).toBe(599);
  });
});

const mockedProducts = [
  {
    npkId: "ZB6114BO",
    productId: 398177,
    url: "www.whiteaway.com/hus-have/stoevsuger/haand-stoevsuger/product/electrolux-zb6114bo-rapido-14-4v-li-ion",
    name: "Electrolux ZB6114BO",
    image:
      "https://images.wagcdn.com/500/500/fill/p/prod_auto/haandstoevsugere/zb6114bo.jpg",
    brand: "Electrolux",
    price: 502,
  },
  {
    npkId: "HD9650/90",
    productId: 668620,
    url: "www.whiteaway.com/koekkenudstyr/madlavning-grill/frituregryde/product/philips-hd9650-90",
    name: "Philips HD9650/90 XXL Air Fry",
    brand: "Philips",
    image:
      "https://images.wagcdn.com/500/500/fill/p/prod_auto/frituregryde/hd9650-90.jpg",
    price: 653,
  },
  {
    npkId: "AD-19130003",
    productId: 1148375,
    url: "www.whiteaway.com/koekkenudstyr/kaffe-the/el-kedel/product/moomin-ceramic-0-8l-53163",
    name: "Moomin Ceramic, 0.8L",
    image:
      "https://images.wagcdn.com/500/500/fill/p/prod_auto/el-kedel/ad-19130003.jpg",
    brand: "Moomin",
    price: 599,
  },
];

function getMocks() {
  const getProductsMock = jest
    .spyOn(ProductsProvider.prototype, "getProducts")
    .mockImplementationOnce(async () => {
      return mockedProducts;
    });

  const getPriceMock = jest
    .spyOn(ProductPriceProvider.prototype, "getPrice")
    .mockImplementationOnce(async () => {
      return 100;
    })
    .mockImplementationOnce(async () => {
      return 200;
    })
    .mockImplementationOnce(async () => {
      return 300;
    });

  const getRatingsMock = jest
    .spyOn(ProductRatingProvider.prototype, "getRatings")
    .mockImplementationOnce(async () => {
      return [1, 3, 2];
    })
    .mockImplementationOnce(async () => {
      return [1, 1, 1];
    })
    .mockImplementationOnce(async () => {
      return [4, 5, 3];
    });

  return { getProductsMock, getPriceMock, getRatingsMock };
}
