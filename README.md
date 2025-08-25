# nodejs-code-challenge-framework

`nodejs-code-challenge-framework` is a mini server and test environment for debugging and solving various coding challenges.

## Structure

* `servers` → contains the Express server app.
* `scratchpad` → a workspace for testing code and running small functions.

## Onboarding

Install dependencies:

```bash
yarn install
```

## Node version

This project is designed to run on **Node.js >= 22**.

## Running the project

### Debug Scratchpad

I usually write in this project as a **quick scratchpad** to test and debug functions.
It’s especially convenient with **VSCode Debug**:

* Open the **scratchpad.ts** file.
* Write the code or function you want to test.
* Set breakpoints if needed.
* Run using the **Debug Scratchpad** configuration in VSCode.
* Quickly inspect outputs, variables, and behavior without setting up a full project.

This makes it very fast to **experiment with ideas** or **verify code snippets**.

### Run server from the terminal

```bash
yarn build
yarn start
```

### Run server in debug mode

Use the **VSCode** `Debug server (with auto restart)` debug command.

## Tests

Tests are located inside the `TESTS` folder.

### Run tests using the terminal

```bash
yarn test
# or
yarn test:coverage
```

### Run tests in debug mode

Use the **VSCode** `Debug Jest Tests` debug command.
