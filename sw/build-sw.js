#!/usr/bin/env node

/**
 * Builds the final `sw.js` file, filled with the list of assets to be pre-cached
 * Based on: https://developer.chrome.com/docs/workbox/app-shell-model
 */

import { generateSW } from 'workbox-build';

// Where the generated service worker will be written to:
const swDest = './dist/sw.js';

generateSW({
  swDest,
  globDirectory: './dist',
  globPatterns: [
    'index.html',
    'main.js',
    '*.png',
    'fonts/*',
    'ico/*',
  ],
  // All navigations for URLs not precached will use this HTML
  navigateFallback: 'index.html'
}).then(({ count, size }) => {
  console.log(`Generated ${swDest}, which precaches ${count} assets totaling ${size} bytes.`);
});