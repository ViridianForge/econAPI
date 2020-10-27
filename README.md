# EconAPI

EconAPIs is a collection of Typescript wrappers for a number of economic data
APIs.

## Requirements

### Development for the project

1. [PNPM](https://pnpm.js.org/)
2. [Husky]()
3. [ESLint](https://eslint.org)
4. [Mocha](https://mochajs.org)
5. [Chai](https://www.chaijs.com)

### Development with the project

1. [Typescript](https://www.typescriptlang.org/)
2. [Axios](https://github.com/axios/axios)

## Setup

To get started working with the components of the project, run:

`pnpm install`

from the root level of the repository.

## Precommit
The project is set up to run prettier and require linting of all typescript files to pass before allowing a commit to be made.

## Linting

`pnpm lint` will run eslint on the the Typescript files in the project, throwing an error on all warnings.

## Tests

`pnpm tests` will run all tests in the project.