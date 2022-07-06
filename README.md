# products-api-challenge

Endpoint that return a new list of products from the Products API and extend them using another APIs.

If i missed something -:> sorry ^^ or if i did some bug somewhere =)

Possible improvements: 

- add `query.toCurrency` validation (didn't do this because product-challenge-price allow any value (maybe it's a bug since for price 1000 and currency 'Wrong currency' it return 1425)
- think about solution with `bluebird Promise.all` and find a way how to improve it
- add more tests
- add better error handling (not it's just one catch block which return 500 and error details)
- add retry logic (https://www.npmjs.com/package/bluebird-retry)

## Structure

`models` -> contains typescript models

`providers` -> contains external providers / endpoint

`services` -> contains application logic

`helpers.ts` -> contains helper functions

## Onboarding guide

- `yarn install`

## Run the project

### Run from the terminal:
  ```
  yarn build;
  yarn start;
  ```

### Run in **debug** mode: 

use **vscode** `Debug server (with auto restart)` debug command

## Tests

Tests are located inside **__TESTS__** folder

### Run tests using terminal:

  ```
  yarn test
  or
  yarn test:coverage;
  ```

### Run tests in **debug** mode: 
 use **vscode** `Debug Jest Tests` debug command

## Funny

Please try to add ; to the .env file at the end of any variable (example -> PORT = 3001;). Then when you will start the server it will create some file 3000. and second time the port will be already in use. Strangeeeee
