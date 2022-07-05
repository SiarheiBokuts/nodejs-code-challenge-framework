// added process.env types based on https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      PRODUCTS_PROVIDER_ENDPOINT: string;
      PRODUCT_PRICE_PROVIDER_ENDPOINT: string;
      PRODUCT_RATING_PROVIDER_ENDPOINT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
