# Signes

http://edu365.cat/signes

## Description

"Signes" (also known as "Mira què dic") is an interactive multimedia dictionary with video, image, sound and text support, which uses the Catalan Sign Language, supervised by the Institut de Llenguatge de Signes de Catalunya (ILLESCAT) and in collaboration with the [Department of Education of Catalonia](http://xtec.gencat.cat).

Vocabulary can be consulted alphabetically or structured in different semantic fields or classifications. These, in turn, are structured into families.

For each word there are:
- One or more videos of the word represented in sign language.
- A picture of the word
- The sound locution of the word

The app also incorporates a game of guessing a hidden word. The first clue presented to the player is the video where the word is represented in sign language. If only watching the video the player does not guess it can ask for two more clues: the image and / or the locution of the word.

This application is intended for:
- Children who use hand signs as a communication medium
- Deaf children who need to learn Sign Language
- Special education teachers and speech therapists
- Parents and guardians

## List of all media used in the app

All media used in the app is located on the folder `public/data`. Unused images and sounds are also stored in the GIT branch [`unused-media`](https://github.com/projectestac/edu365-signes/tree/unused-media).

The complete list of all words and media can be consulted in this [Google spreadsheet](https://docs.google.com/spreadsheets/d/1lKUyOrmFfTzWKyLfTNXI4sLX2d-e9ONCyMBFGGi9zxY/edit?usp=sharing).


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
This launches the app in development mode.<br>
Open [http://localhost:9001](http://localhost:9001) to view it in the browser.

The page will automatically reload when you make edits.<br>

#### Build the main application:
```bash
$ cd path/to/signes
$ npm run build
```
Builds the app for production into the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The contents of `/public/data` are symlinked into `/build`, thus allowing the media assets to be found by the app.

## License
"Signes" is an open source development made by the Department of Education of the Government of Catalonia, released under the terms of the [European Union Public Licence v. 1.2](https://eupl.eu/1.2/en/).
