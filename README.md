# products-api-challenge

Endpoint that return a new list of products from the Products API and extended them using another APIs.

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

Please try to add ; to the .env file at the end of any variable (example -> PORT = 3001;). Then when u will start the server it will create some file 3000. and second time the port will be already in use. Strangeeeee
