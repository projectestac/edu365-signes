import React, { useState, useEffect } from 'react';
import { checkFetchJsonResponse, getQueryParam } from './utils/utils.js';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Diccionari from './components/Diccionari.js';
import Recordem from './components/Recordem.js';
import Ajuda from './components/Ajuda.js';
import logoPetit from "./assets/logo-petit.svg";
import logoGran from "./assets/logo-gran.svg";

const DATA_PATH = 'data';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(true);
  const [mode, setMode] = useState('');
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
        {!mode &&
          <Card onClick={() => setMode('')} className="titol">
            <Card.Img src={logoGran} className="logo-gran"/>
            <Card.Title>Diccionari Multimèdia de Signes de Catalunya</Card.Title>            
          </Card>
          ||
          <Button onClick={() => setMode('')} variant="ligth"><img src={logoPetit} className="logo-petit" ></img></Button>
        }
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
        mode === 'diccionari' &&
        <Diccionari {...{ data, paraulaInicial: mode === 'diccionari' ? paraulaInicial : null }} />
        || mode === 'recordem' &&
        <Recordem {...{ data, paraulaInicial: mode === 'recordem' ? paraulaInicial : null }} />
        || mode === 'credits' &&
        <Ajuda />
        ||
        <div className="botons">
          <Button variant="primary" onClick={() => setMode('diccionari')}>Diccionari</Button>
          <Button variant="primary" onClick={() => setMode('recordem')}>Recordem</Button>
          <Button variant="primary" onClick={() => setMode('credits')}>Ajuda</Button>
          <Button variant="success" >Instal·la l'app</Button>
        </div>
      }
    </div >
  );
}

export default App;