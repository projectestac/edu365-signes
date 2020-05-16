import React, { useState, useEffect } from 'react';
import { checkFetchJsonResponse } from './utils/utils';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Diccionari from './components/Diccionari';
import Recordem from './components/Recordem';


const DATA_PATH = 'data';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(true);
  const [mode, setMode] = useState('diccionari');

  useEffect(() => {
    setLoading(true);
    fetch(`${DATA_PATH}/data.json`)
      .then(checkFetchJsonResponse)
      .then(data => setData(data))
      .catch(err => setError(err?.toString() || 'Error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="root">
      <header>
        <Alert variant="primary">
          <h2>Mira què dic</h2>
          Diccionari Multimèdia de Signes de Catalunya
        </Alert>
      </header>
      {loading &&
        <Alert variant="secondary">
          <Spinner animation="border" variant="info" className="spinner" />
          S'estan carregant les dades...
        </Alert>
      }
      {error &&
        <Alert variant="danger">
          {error}
        </Alert>
      }
      {!loading && !error && data &&
        <Tabs
          activeKey={mode}
          onSelect={setMode}
        >
          <Tab eventKey="diccionari" title="Diccionari">
            <Diccionari {...{ data }} />
          </Tab>
          <Tab eventKey="recordem" title="Recordem">
            <Recordem {...{ data }} />
          </Tab>
        </Tabs>
      }
    </div>
  );
}

export default App;