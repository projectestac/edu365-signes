/* global importScripts */

if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

  // Catch possible "SKIP_WAITING" events
  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /* global workbox */
  if (workbox) {

    // Set debug mode based on search params when registering, like: `sw.js?debug`
    // From: https://stackoverflow.com/questions/50795315/workbox-set-debug-mode-dynamically
    const url = new URL(location.href);
    const debug = url.searchParams.has('debug');
    workbox.setConfig({ debug });

    // Import statements
    const {
      core: { setCacheNameDetails, clientsClaim },
      precaching: { precacheAndRoute, /* createHandlerBoundToURL, */ },
      routing: { registerRoute, /* NavigationRoute, */ },
      strategies: { CacheFirst, /* StaleWhileRevalidate, */ },
      expiration: { ExpirationPlugin },
      cacheableResponse: { CacheableResponsePlugin },
      recipes: { googleFontsCache },
      /* rangeRequests: { RangeRequestsPlugin }, */
    } = workbox;

    // Set a specific prefix for this SW, used in cache names
    setCacheNameDetails({
      prefix: 'mqdic',
    });

    // Take control immediatly
    clientsClaim();

    // Injection point for manifest files
    precacheAndRoute(self.__WB_MANIFEST || []);

    // Cache for icons
    registerRoute(
      /\/ico\//,
      new CacheFirst({
        cacheName: 'icons',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [200],
          }),
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );

    // Cache for images
    registerRoute(
      /\/data\/imatges\//,
      new CacheFirst({
        cacheName: 'imatges',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [200],
          }),
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );

    // Cache for sounds
    registerRoute(
      /\/data\/sons\//,
      new CacheFirst({
        cacheName: 'sons',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [200],
          }),
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );

    // Cache for videos
    registerRoute(
      /\/data\/videos\//,
      new CacheFirst({
        cacheName: 'videos',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [200],
          }),
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    );

    // Use the recipe for Google Fonts in WorkBox 6, instead of the full pattern
    googleFontsCache();

  } else
    console.log('Workbox could not be loaded. No offline support!');
}
