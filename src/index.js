import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './main.css';

const container = document.getElementById('mqdic-container');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
