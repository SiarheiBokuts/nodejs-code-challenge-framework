import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Currency } from "./models/currency.model";
import { GetExtendedProducts } from "./services/get-extended-products";
import * as helpers from "./helpers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/products", async (req: Request, res: Response) => {
  try {
    const toCurrency: Currency = helpers.getCorrectCurrency(
      req.query.toCurrency,
      Currency.DanishKrone
    );

    const extendedProducts =
      await new GetExtendedProducts().getExtendedProducts(
        toCurrency,
        Currency.DanishKrone
      );
    res.json(extendedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error during execution!",
      errorDetails: error,
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
