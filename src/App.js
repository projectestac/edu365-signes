import React, { useState, useEffect } from 'react';
import { checkFetchJsonResponse, getQueryParam } from './utils/utils';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Diccionari from './components/Diccionari';

const DATA_PATH = 'data';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(true);
  const [paraula, setParaula] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${DATA_PATH}/data.json`)
      .then(checkFetchJsonResponse)
      .then(data => {
        setData(data);
        const qp = getQueryParam('paraula').toUpperCase();
        if (qp) {
          setParaula(data.paraules.find(p => p.paraula === qp));
        }
      })
      .catch(err => setError(err?.toString() || 'Error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container fluid="md">
      <header>
        <Jumbotron>
          <h1 className="header">Mira què dic</h1>
          <h2 className="sub-header">Diccionari Multimèdia de Signes de Catalunya</h2>
        </Jumbotron>
      </header>
      {loading &&
        <div className="loading">
          <Spinner animation="border" variant="primary"/>
          <p>S'estan carregant les dades...</p>
        </div>
      }
      {error &&
        <div className="error">
          <Alert variant="warning">{error}</Alert>
        </div>
      }
      {!loading && !error && data && <Diccionari {...{ data, paraula, setParaula }} />}
    </Container>
  );
}

export default App;