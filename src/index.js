import { Workbox } from 'workbox-window';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './main.css';

if ('serviceWorker' in navigator) {
  const url = new URL(location.href);
  const debug = url.searchParams.has('debug');
  const wb = new Workbox(`/service-worker.js${debug ? '?debug' : ''}`);
  wb.register();
}

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<App />);
