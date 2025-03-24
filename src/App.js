import React, { useState, useEffect } from 'react';
import { checkFetchJsonResponse, getQueryParam } from './utils/utils.js';
import { webAppInstallInit, PWA_BTN_CLASSNAME, installHandleClick, pwaButtonStyle } from './utils/webAppInstall.js';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Diccionari from './components/Diccionari.js';
import Recordem from './components/Recordem.js';
import Ajuda from './components/Ajuda.js';
import logoPetit from './assets/logo-petit.svg';
import logoGran from './assets/logo-gran.svg';
import { FaSpellCheck } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

const DATA_PATH = 'data';

/**
 * Initialize the PWA installer
 * See: https://developers.google.com/web/fundamentals/app-install-banners/
 */
webAppInstallInit();

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
    <div className="root" style={{minHeight: '100vh'}}>
      {!mode &&
        <header>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <Card onClick={() => setMode('')} className="titol">
                <Card.Img src={logoGran} className="logo-gran" />
                <Card.Title>Diccionari Multimèdia de Signes de Catalunya</Card.Title>
              </Card>
              <div className="botons">
                <Button variant="primary" onClick={() => setMode('diccionari')}>
                  <FaBook className="left-icon" />
                  Diccionari
                </Button>
                <Button variant="primary" onClick={() => setMode('recordem')}>
                  <FaSpellCheck className="left-icon" />
                  Recordem
                </Button>
                <Button variant="primary" onClick={() => setMode('credits')}>
                  <FaInfoCircle className="left-icon" />
                  Informació
                </Button>
                <Button variant="success" className={PWA_BTN_CLASSNAME} style={pwaButtonStyle()} onClick={installHandleClick}>
                  <FaCloudDownloadAlt className="left-icon" />
                  Instal·la l'aplicació
                </Button>
              </div>
            </div>
          </div>
        </header>
        ||
        <header>
          <Button onClick={() => setMode('')} variant="ligth"><img src={logoPetit} className="logo-petit" ></img></Button>
        </header>
      }
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
      }
    </div >
  );
}

export default App;