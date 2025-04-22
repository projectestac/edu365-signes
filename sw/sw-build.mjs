#!/usr/bin/env node

/*!
 *  File    : sw/sw-build.js
 *  Created : 01/04/2025
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Mira què dic! - Diccionari multimèdia de la llengua de signes catalana
 *  https://mqdic.edigital.cat
 *
 *  @source https://github.com/projectestac/edu365-signes
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2021 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

/**
 * Builds the final `service-worker.js` file, filled with the list of assets to be pre-cached
 * Based on: https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
 */

import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import workboxBuild from 'workbox-build';

// Read environment variables from .env, taking production settings by default
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const TEMPLATE = process.argv[2] || path.join(path.dirname(process.argv[1]), 'sw-template.js');
const DEST = process.argv[3] || path.join('dist', 'service-worker.js');
const BUILD_DIR = process.argv[3] || 'dist';

if (!fs.existsSync(TEMPLATE) || !fs.existsSync(path.dirname(DEST)) || !fs.existsSync(BUILD_DIR)) {
  console.log('ERROR: Invalid template or dest file\nUsage: node sw-build.js [template] [dest] [build-dir]');
  process.exit(1);
}

// Default globPattern was: ['**/*.{html,js,css,png}']
const GLOB_PATTERNS = [
  'index.html',
  'signes.js',
  'manifest.json',
  'ico/favicon.ico',
  'ico/icon.svg',
  'ico/apple-touch-icon.png',
  'ico/icon96.png',
  'data/data.json',
];

const GLOB_IGNORES = [
  'precache-manifest.*.js',
  'service-worker.js'
];

// Generate the service worker, injecting the list of files to be precached
workboxBuild.injectManifest({
  swSrc: TEMPLATE,
  swDest: DEST,
  globDirectory: BUILD_DIR,
  globPatterns: GLOB_PATTERNS,
  globIgnores: GLOB_IGNORES,
})
  .then(({ count, size, warnings }) => {
    console.log(`Created "${DEST}" from template "${TEMPLATE}"`);
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
