---
layout: false
rename:
  basename: 'README.md'
---
# <%= ask('name') %>

<p style="text-align:center">
  By <img src="src/assets/img/brand.png"/><br/>
  <span style="font-weight: bold; font-style: italic; font-size:1.5em">
    −− <%= ask('description') %> −−
  </span><br>
  <a href="https://npmjs.org/package/<%= ask('name') %>" target="_blank">
    <img alt="NPM version" src="https://badge.fury.io/js/<%= ask('name') %>.svg"/>
  </a>
  <a href="https://travis-ci.org/<%= ask('namespace') %>/<%= ask('name') %>" target="_blank">
    <img alt="Build Status" src="https://travis-ci.org/<%= ask('namespace') %>/<%= ask('name') %>.svg?branch=master"/>
  </a>
  <a href="https://standardjs.com" target="_blank">
    <img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/>
  </a>
</p>

## Installation

### Global

```sh
$ yarn gobal add <%= ask('name') %>
```

or

```sh
$ npm install --global <%= ask('name') %>
```

### Local

```sh
$ yarn add [-D] <%= ask('name') %>
```

or

```sh
$ npm install --save[-dev] <%= ask('name') %>
```

## Usage

### Global

```sh
$ <%= ask('name') %>
```

### Local

```js
import <%= camelcase(ask('name')) %> from '<%= ask('name') %>'
<%= camelcase(ask('name')) %>()
```

### Example

#### Usage screenshot

![Usage example](src/assets/img/placehold-350x150.png)

## API

**@TODO: document the API here**

## Contributing

### Codebase

The codebase is written using the [ESNext Specification](https://github.com/hemanth/es-next) (ECMAScript Stage 0), following the [StandardJS Code Style](https://standardjs.com/)

[![ECMASript](src/assets/img/esnext.png)](https://github.com/hemanth/es-next)
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

> See the [contribution guide](CONTRIBUTING.md) in a separated document.

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
$ git clone git@github.com:<%= ask('namespace') %>/<%= ask('name') %>.git
$ cd <%= ask('name') %>
$ yarn install
```
#### Running test

Finally, run the test pipeline:

```sh
$ yarn pipeline:test
```

#### Available yarn scripts

| Task Command | Task description |
|---|---|
| `yarn clear` | Delete the `./build/` and `./dist` repositories |
| `yarn lint` | Lint source files |
| `yarn lint:esnext` | Lint ESNext source files |
| `yarn build` | Build the whole distribution |
| `yarn build:assets` | Build all the assets |
| `yarn build:assets:img` | Build the images assets |
| `yarn build:lib` | Build only the lib |
| `yarn build:tests` | Build only the tests |
| `yarn build:docs` | **[TODO]** Build only the docs |
| `yarn test` | Run the tests in `./dist/tests/` |
| `yarn tests` | An alias for `yarn test` |
| `yarn travis` | Run the travis script |
| `yarn docs` | **[TODO]** Serve the docs |
| `yarn pipeline` | Run the complete pipeline |
| `yarn pipeline:test` | Run the required jobs to run the tests, then run the tests |
| `yarn pipeline:build` | Run the required jobs to build the dist, then build the dist |
| `yarn pipeline:docs` | **[TODO]** Run the required jobs to serve the docs, then serve the docs |
| `yarn pipeline:build:tests` | Run the required jobs to build the docs, then build the docs |
| `yarn pipeline:build:lib` | Run the required jobs to build the docs, then build the docs |
| `yarn pipeline:build:docs` | **[TODO]** Run the required jobs to build the docs, then build the docs |
| `yarn release` | An alias to `yarn release:patch` |
| `yarn release:prerelease` | Release and publish a new semver version (x.y.z-rc+1)|
| `yarn release:patch` | Release and publish a new patch semver version (`x.y.z+1`)|
| `yarn release:minor` | Release and publish a new minor semver version (`x.y+1.z=0`)|
| `yarn release:major` | Release and publish a new major semver version (`x+1.y=0.z=0`)|

#### Releasing a new version

The task `yarn pipeline:build` generate a `./dist` folder in the repository's root directory but this folder is not part of the git repository (there is an entry in the `.gitignore` file). However the dist folder is included in the `package.json#files` field.

Thus to release a new, lets say, "patch" version, just run:

```sh
$ yarn release:patch
```

The whole build pipeline is run locally (lint, transpile, test) and then a new git tag and a new npm tag are pushed up.

## License

Copyright © [<%= ask('owner') %>](https://github.com/<%= ask('namespace') %>)

See [LICENSE](LICENSE)
