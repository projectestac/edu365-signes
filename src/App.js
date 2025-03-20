import React, { useState, useEffect } from 'react';
import { checkFetchJsonResponse, getQueryParam } from './utils/utils.js';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Diccionari from './components/Diccionari.js';
import Recordem from './components/Recordem.js';
import Ajuda from './components/Ajuda.js';

const DATA_PATH = 'data';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(true);
  const [mode, setMode] = useState('diccionari');
  const [paraulaInicial, setParaulaInicial] = useState(null);

  useEffect(() => {
    const pMode = getQueryParam('mode');
    if (pMode === 'diccionari' || pMode === 'recordem')
      setMode(pMode);
    setLoading(true);
    fetch(`${DATA_PATH}/data.json`)
      .then(checkFetchJsonResponse)
      .then(data => {
        const fullData = {
          ...data,
          paraules: data.paraules.map(p => ({
            ...p,
            label: `${p.paraula}${p.repeticio ? ` (${p.repeticio})` : ''}`
          }))
        }
        setData(fullData);
        const pParaula = getQueryParam('paraula').toUpperCase();
        if (pParaula)
          setParaulaInicial(fullData.paraules.find(p => p.label === pParaula));
      })
      .catch(err => setError(err?.toString() || 'Error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="root">
      <header>
        <Alert variant="primary">
          <h2>MIRA QUÈ DIC!</h2>
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
          <Tab eventKey="diccionari" title="DICCIONARI">
            <Diccionari {...{ data, paraulaInicial: mode === 'diccionari' ? paraulaInicial : null }} />
          </Tab>
          <Tab eventKey="recordem" title="RECORDEM">
            <Recordem {...{ data, paraulaInicial: mode === 'recordem' ? paraulaInicial : null }} />
          </Tab>
          <Tab eventKey="credits" title="AJUDA">
            <Ajuda />
          </Tab>
        </Tabs>
      }
    </div>
  );
}

export default App;