import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { parseStringSettings } from './utils/utils.js';
import merge from 'deepmerge';

// Import CSS
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css' with {type: 'css'};
import typeAheadCSS from 'react-bootstrap-typeahead/css/Typeahead.css' with {type: 'css'};
import mainCSS from './main.css' with {type: 'css'};
import fontsCSS from './fonts.css' with {type: 'css'};

const CSSStyles = [bootstrapCSS, typeAheadCSS, mainCSS];
const CSSFonts = [fontsCSS];

const insertStyles = (styles, target, replaceBody = false) => {  
  styles.forEach(css => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = replaceBody ? css.replace('}body{', '}.root{').replace(':root','.root') : css;
    target.appendChild(styleTag);
  });
}

const DEFAULT_SETTINGS = {
  mediaSrc: 'data',
  mediaBlobs: true,
};

// Direct React render to container div, if exists
const container = document.getElementById('mqdic-container');
if (container) {
  insertStyles([...CSSStyles, ...CSSFonts], document.head, false);
  const root = createRoot(container);
  root.render(<App {...{ settings: DEFAULT_SETTINGS }} />);
}

// Define also a custom web component
class MQDicApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const { shadowRoot } = this;
    insertStyles(CSSStyles, shadowRoot, true);
    insertStyles(CSSFonts, document.head, false);
    this.settings = DEFAULT_SETTINGS;
  }

  connectedCallback() {

    this.mountPoint = document.createElement('div');
    this.shadowRoot.appendChild(this.mountPoint);

    // Parse the "data-" props passed to the web component, and set the 'isWebComponent' flag
    const dataSettings = { ...parseStringSettings(this.dataset), isWebComponent: true };

    // Transfer our `style` attribute to the mountPoint
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

  static get observedAttributes() {
    return ['data-data-path', 'data-use-blobs'];
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (this.root) {
      const dataSettings = { ...parseStringSettings(this.dataset), isWebComponent: true };
      this.root.render(<App {...{ settings: merge(DEFAULT_SETTINGS, dataSettings) }} />);
    }
  }
}

customElements.define('mqdic-app', MQDicApp);
