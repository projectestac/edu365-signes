/*!
 *  File    : index.js
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

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { parseStringSettings } from './utils/utils.js';
import merge from 'deepmerge';

// Named imports of CSS, to be programatically injected later
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css' with {type: 'css'};
import typeAheadCSS from 'react-bootstrap-typeahead/css/Typeahead.min.css' with {type: 'css'};
import mainCSS from './main.css' with {type: 'css'};
import fontsCSS from './fonts.css' with {type: 'css'};

const CSSStyles = [bootstrapCSS, typeAheadCSS, mainCSS];
const CSSFonts = [fontsCSS];

/**
 * Inject the provided array of styles into the specified target
 * @param {string []} styles - Array of CSS style declarations
 * @param {string} target - Usually the `document.head` or a [shadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot)
 * @param {string} replaceBody - When not null, `body` and `:root` selectors will be replaced by the provided expression
 */
const insertStyles = (styles, target, replaceBody = null) => {
  styles.forEach(css => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = replaceBody
      ? css.replaceAll('}body{', `}.${replaceBody}{`).replaceAll(':root', `.${replaceBody}`)
      : css;
    target.appendChild(styleTag);
  });
}

/* global process */
const DEFAULT_SETTINGS = {
  mediaSrc: process.env.MEDIA_SRC,
  mediaBlobs: process.env.MEDIA_BLOBS === 'true',
};

// Direct React render to a container element, if exists
const container = document.getElementById('mqdic-container');
if (container) {
  insertStyles([...CSSStyles, ...CSSFonts], document.head);
  const root = createRoot(container);
  root.render(<App {...{ settings: DEFAULT_SETTINGS }} />);
}

// Declare also a custom web component, to be used with "<mqdic-app data-media-src="..." data-media-blobs="true|false"></mqdic-app>"
class MQDicApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    insertStyles(CSSStyles, this.shadowRoot, 'mqdic-root');
    insertStyles(CSSFonts, document.head);
    this.settings = DEFAULT_SETTINGS;
  }

  connectedCallback() {
    // Create a mount point into the shadow DOM
    this.mountPoint = document.createElement('div');
    this.shadowRoot.appendChild(this.mountPoint);

    // Parse the "data-" props passed to the web component, and set the 'isWebComponent' flag
    const dataSettings = { ...parseStringSettings(this.dataset), isWebComponent: true };

    // Transfer our `style` attribute to the mount point
    const styleAttr = this.getAttribute('style');
    if (styleAttr) {
      this.mountPoint.setAttribute('style', styleAttr);
      this.removeAttribute('style');
    }

    this.root = createRoot(this.mountPoint);
    this.root.render(<App {...{ settings: merge(DEFAULT_SETTINGS, dataSettings) }} />);
  }

  disconnectedCallback() {
    this.root.unmount();
  }

}

customElements.define('mqdic-app', MQDicApp);
