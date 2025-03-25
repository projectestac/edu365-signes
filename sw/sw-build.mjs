#!/usr/bin/env node

/**
 * Builds the final `service-worker.js` file, filled with the list of assets to be pre-cached
 * Based on: https://karannagupta.com/using-custom-workbox-service-workers-with-create-react-app/
 */

// Read environment variables from .env, taking production settings by default
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import path from 'node:path';
import fs from 'node:fs';
import workboxBuild from 'workbox-build';

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
  'main.js',
  'manifest.json',
  '*.png',
  '*.svg',
  'fonts/*',
  'ico/*',
  'screenshots/*',
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
