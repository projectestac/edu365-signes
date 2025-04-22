/**
 * Wait to receive a 'getLocationSearch' message request from the iframe, and reply
 * it with the current value of "window.location.search".
 */
if (window.location.search) {
  window.addEventListener('message', (event) => {
    if (event?.data === 'getLocationSearch')
      event?.source?.postMessage({ type: 'locationSearch', value: window.location.search }, '*');
  });
}
