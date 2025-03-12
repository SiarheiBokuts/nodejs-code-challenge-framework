# nodejs-code-challenge-framework

nodejs-code-challenge-framework is a mini server and test environment for debugging and solving various coding challenges

## Structure

`servers`    -> contains express server app
`scratchpad` -> a workspace for testing code and running small functions

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


