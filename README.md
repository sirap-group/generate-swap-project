# generate-swap-project [![NPM version](https://badge.fury.io/js/generate-swap-project.svg)](https://npmjs.org/package/generate-swap-project) [![Build Status](https://travis-ci.org/rbecheras/generate-swap-project.svg?branch=master)](https://travis-ci.org/rbecheras/generate-swap-project) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


> A generator for SWAP projects

## Installation

```sh
$ npm install --global generate generate-swap-project
```

## Usage

```sh
$ gen swap-project
```

## Contribute


### Codebase

The codebase is written using the [ESNext Specification](https://github.com/hemanth/es-next) (ECMAScript Stage 0), following the [StandardJS Code Style](https://standardjs.com/)

[![ECMASript](src/assets/img/js.png)](https://github.com/hemanth/es-next)
[![JavaScript Style Guide](src/assets/img/standard.png)](https://github.com/standard/standard)
[![ESLint](src/assets/img/eslint.png)](https://eslint.org)
[![Babel JS](src/assets/img/babel.png)](https://babeljs.io)
[![Yarn](src/assets/img/yarn.png)](https://yarnpkg.com/en/)

We use:

- [Yarn](https://yarnpkg.com/fr/) to handle npm dependencies,
- [ESNext CLI](https://github.com/esnext/esnext) to transform ESx code to ESNext,
- [Babel CLI](https://babeljs.io/) to transpile ESNext code to node/browser compatible javascript,
- And [Standard CLI](https://www.npmjs.com/package/standard) + [ESLint](https://eslint.org) to lint or format ESNext codebase.

### Contribution guide

> See the [contribution guide](contributing.md) in a separated document.

### Development

#### Global dependencies

Get the latest node engine (example with `nvm`):

```sh
$ nvm install lts/carbon
```

Install yarn from npm (for development only):

```sh
$ npm install --global yarn
```

All the rest of the development dependencies are local.

#### Clone and install

Clone the repo and install dependencies:

```sh
$ git clone git@github.com:rbecheras/generate-swap-project.git
$ cd generate-swap-project
$ yarn install
```
#### Running test

Finally, run the whole pipeline to get running tests:

```sh
$ yarn pipeline
```

#### Discover the tasks pipeline

| Task Command | Task description |
|---|---|
| `yarn clear` | Delete the `./build/` and `./dist` repositories |
| `yarn lint` | Lint source files |
| `yarn lint:esnext` | Lint ESNext source files |
| `yarn build` | Build the whole distribution |
| `yarn build:lib` | Build only the lib |
| `yarn build:tests` | Build only the tests |
| `yarn build:docs` | Build only the docs |

## License

MIT © [Rémi Becheras](https://github.com/rbecheras)
