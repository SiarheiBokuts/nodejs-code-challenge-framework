# nodejs-code-challenge-framework

nodejs-code-challenge-framework is a mini server and test environment for debugging and solving various coding challenges

## Structure

`servers` -> contains express server app
`scratchpad` -> a workspace for testing code and running small functions

## Onboarding guide

- `yarn install`

## Run the project

### Debug Scratchpad

I usually write in this project as a **quick scratchpad** to test and debug functions.  
It’s especially convenient with **VSCode Debug**:

- Open the **scratchpad.ts** file.
- Write the code or function you want to test.
- Set breakpoints if needed.
- Run using the **Debug Scratchpad** configuration in VSCode.
- Quickly inspect outputs, variables, and behavior without setting up a full project.

This makes it very fast to **experiment with ideas** or **verify code snippets**.

### Run from the terminal:

```
yarn build;
yarn start;
```

### Run in **debug** mode:

use **vscode** `Debug server (with auto restart)` debug command

## Tests

Tests are located inside ****TESTS**** folder

### Run tests using terminal:

```
yarn test
or
yarn test:coverage;
```

### Run tests in **debug** mode:

use **vscode** `Debug Jest Tests` debug command
