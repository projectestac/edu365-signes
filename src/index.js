import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './main.css';

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<App />);
