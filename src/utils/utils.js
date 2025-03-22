import queryString from 'query-string';

/**
 * Gets the value associated to the given key on the query section of current location
 * @param {string} key - The key to search for
 * @returns {string} - The value associated to the given key, or an empty string if none
 */
export function getQueryParam(key) {
  return queryString.parse((parent ? parent.window.location : window.location).search)[key] || '';
}

/**
 * Checks the network `ok` flag in fetch responses, throwing an error if the HTTP response was not in range 200-299
 * @param {Response} response - The [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object returned by [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 * @returns {object} - The object obtained when parsing the response as JSON
 */
export function checkFetchJsonResponse(response) {
  if (!response.ok)
    throw new Error(`"${response.status} ${response.statusText}" en intentar llegir ${response.url}`);
  return response.json();
};

/**
 * Fetches a remote file, returning it as a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
 * @param {string} url 
 * @returns Blob
 */
export function fetchBinaryData(url) {
  return fetch(url, {})
    .then(response => {
      if (!response.ok)
        throw new Error(`"${response.status} ${response.statusText}" en intentar llegir ${response.url}`);
      return response.blob();
    });
}

/**
 * Fetches a remote file, returning it as an object URL.
 * IMPORTANT: Remember to manually clean the object URL when not needed, 
 * calling [revokeObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static).
 * @param {string} url 
 * @returns string
 */
export function fetchBinaryDataURL(url) {
  return fetchBinaryData(url)
    .then(blob => {
      return URL.createObjectURL(blob);
    });
}
