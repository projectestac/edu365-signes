import queryString from 'query-string';

/**
 * Parse a query string into an object
 * @param {string} query - The query string. When _null_, window.location.search is used (if available)
 * @returns object
 */
export function getQueryParams(query) {
  if (!query) {
    // Avoid same-site CORS errors in iframes
    try {
      query = window.top.location.search;
    } catch (_err) {
      return (Object.create(null));
    }
  }
  return queryString.parse(query || '');
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
