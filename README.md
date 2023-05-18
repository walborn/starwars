# Star Wars Heroes Catalog

List of star wars heroes with detailed information 


<br>

## Features

- ⚛️ React
- 🌀 TypeScript
- 🥗 SCSS Loader
- 🎨 CSS Loader
- 📸 Image Loader
- 🆎 Font Loader
- 🧹 ESLint
- 🔱 Webpack & Configuration
- 🧩 Aliases for Project Paths
- 🔥 React Fast Refresh + Webpack HMR
- 🌞 Dark / Light Theme

<br />

## Installation

#### To install this boilerplate you need to run following commands

<br />

Clone the repository :

```bash
git clone git@github.com:walborn/starwars.git
```

<br />

Install dependencies using Yarn or NPM or PNPM :

```bash
yarn install
```

<br />

## Start : Development

To develop and run your web application, you need to run following command:

```bash
yarn start
```

<br />

## Lint : Development

To lint application source code using ESLint via this command :

```bash
yarn lint
```

<br />

## Build : Production

Distribution files output will be generated in `dist/` directory by default.

To build the production ready files for distribution, use the following command :

```bash
yarn build
```

<br />

## Serve : Production

Serve helps you serve a static site, single page application or just a static file. It also provides a neat interface for listing the directory's contents. This command serves build files from `dist/` directory.

```bash
yarn serve
```

<br />

## Webpack Configurations

To make it easier for managing environment based webpack configurations, we using separated `development` and `production` configuration files, they are available in :

```bash
# Development webpack config
webpack/webpack.config.dev.js

# Production webpack config
webpack/webpack.config.prod.js
```

For further information, you can visit [Webpack Configuration](https://webpack.js.org/configuration/)


## Commiting
> make commit messages great again!
If you don't have, install commitizen globally
```
> npm install --global commitizen
```
Then you can use this command to create a new commit
```
> git add .
> git cz
```