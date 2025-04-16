import React, { useState, useEffect } from 'react';
import { checkFetchJsonResponse, getQueryParams } from './utils/utils.js';
import { webAppInstallInit, PWA_BTN_CLASSNAME, installHandleClick, pwaButtonStyle } from './utils/webAppInstall.js';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Diccionari from './components/Diccionari.js';
import Recordem from './components/Recordem.js';
import Ajuda from './components/Ajuda.js';
import LogoPetit from './assets/logo-petit.svg';
import LogoGran from './assets/logo-gran.svg';
import logoAigues from './assets/logo_les_aigues.png';
import eduLogo from './assets/edu_logo.png';
import { FaSpellCheck } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

/**
 * Initialize the PWA installer
 * See: https://developers.google.com/web/fundamentals/app-install-banners/
 */
webAppInstallInit();

function App({ settings }) {
  const { mediaSrc } = settings;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState('');
  const [paraulaInicial, setParaulaInicial] = useState(null);

  const processQueryParams = (queryStr = '') => {
    const params = getQueryParams(queryStr);
    if (params.paraula) {
      const paraula = params.paraula.toUpperCase();
      const p = data?.paraules?.find(p => p.label === paraula)
      if (p) {
        setParaulaInicial(p);
        setMode(params.mode === 'recordem' ? 'recordem' : 'diccionari');
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${mediaSrc}/data.json`)
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
      })
      .catch(err => setError(err?.toString() || 'Error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (data) {
      if (window.self !== window.top) {
        window.addEventListener('message', (event) => {
          if (event?.data?.type === 'locationSearch' && event?.data?.value)
            processQueryParams(event.data.value);
        });
        window.top.postMessage('getLocationSearch', '*');
      } else {
        processQueryParams();
      }
    }
  }, [data]);

  return (
    <div className="root">
      <div className="content">
        {!mode &&
          <header className="home-header">
            <Card className="titol">
              {/* <Card.Img src={logoGran} className="logo-gran" />*/}
              <LogoGran className="logo-gran" />
              <Card.Title>Diccionari multimèdia de la llengua de signes catalana</Card.Title>
            </Card>
            <div className="botons">
              <Button variant="primary" size="lg" onClick={() => setMode('diccionari')}>
                <FaBook className="left-icon" />
                Diccionari
              </Button>
              <Button variant="primary" size="lg" onClick={() => setMode('recordem')}>
                <FaSpellCheck className="left-icon" />
                Recordem
              </Button>
              <Button variant="primary" size="lg" onClick={() => setMode('credits')}>
                <FaInfoCircle className="left-icon" />
                Informació
              </Button>
            </div >
            <div className="botons">
              <Button variant="outline-primary" size="lg" className={PWA_BTN_CLASSNAME} style={pwaButtonStyle()} onClick={installHandleClick}>
                <FaCloudDownloadAlt className="left-icon" />
                Instal·la l'aplicació
              </Button>
            </div>
          </header>
          ||
          <header>
            <Button onClick={() => { setMode(''); setParaulaInicial(null); }} variant="ligth">
              <LogoPetit className="logo-petit" alt="Mira què dic!" title="Mira què dic!" />
            </Button>
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
          <Diccionari {...{ settings, data, paraulaInicial }} />
          || mode === 'recordem' &&
          <Recordem {...{ settings, data, paraulaInicial }} />
          || mode === 'credits' &&
          <Ajuda />
        }
      </div>
      {(!mode || mode === 'credits') &&
        <footer>
          <div className="logos">
            <Button href="https://agora.xtec.cat/ceelesaigues/" target="_blank" variant="ligth">
              <img src={logoAigues} alt="CEE Les Aigües"></img>
            </Button>
            <Button href="https://edu365.cat/" target="_blank" variant="ligth">
              <img src={eduLogo} alt="edu365"></img>
            </Button>
          </div>
        </footer>
      }
    </div >
  );
}

export default App;