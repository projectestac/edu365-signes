/*!
 *  File    : utils/utils.js
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

/**
 * Parses the provided string expression, returning the most appropiate
 * type: object (or array), boolean, number or string
 * @param {*} s 
 * @returns *
 * @throws exception
 */
export function parseExpression(s = '') {
  // Parse only strings
  if (typeof s !== 'string' || s === '')
    return s;

  // If the expression starts with "{", "[", or is a boolean, parse it as JSON
  if (/(?:^{|^\[|^true$|^false$|^null$)/.test(s))
    return JSON.parse(s);

  // Check if it's a numeric expression
  const n = Number(s);
  if (!isNaN(n))
    return n;

  // Otherwise return the original string
  return s;
}

/**
 * Returns a clone of the provided object, interpreting string values staring with "{" or "[" as JSON expressions that
 * will be parsed and converted to real objects and arrays
 * @param {object} data 
 * @returns object
 */
export function parseStringSettings(data = {}) {
  return Object.keys(data).reduce((result, k) => {
    try {
      result[k] = parseExpression(data[k]);
    } catch (err) {
      console.error('Error parsing value:', data[k], err);
    }
    return result;
  }, {});
}
