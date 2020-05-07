# Signes

https://edu365.cat/signes


## Description

...

## Building the app

### Prerequisites

- [NodeJS](https://nodejs.org/) is needed to build the main application. Linux users are advised to use the [official LTS repositories](https://github.com/nodesource/distributions/blob/master/README.md).

### Setting up

First of all, the [NPM](https://www.npmjs.com/) components must be loaded:

```bash
# Go to the main project directory:
$ cd path/to/signes

# Install the required npm components:
$ npm ci
```

### Common operations

From here, the most usual operations are:

#### Launch the development server:
```bash
$ cd path/to/signes
$ npm start
```
Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>

#### Build the main application:
```bash
$ cd path/to/mapa-innovacio-edu
$ npm run build
```
Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

All the contents of `/public` should be copied or symlinked in `/build`, thus allowing the media assets to be found.

## License
"Signes" is an open source development made by the Department of Education of the Government of Catalonia, released under the terms of the [European Union Public Licence v. 1.2](https://eupl.eu/1.2/en/).
