import React, { useState, useEffect } from 'react';
import { checkFetchJsonResponse, getQueryParam } from './utils/utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
    <Container maxWidth="md" className="root">
      <header>
        <Typography variant="h3">Mira què dic</Typography>
        <Typography variant="subtitle2">Diccionari Multimèdia de Signes de Catalunya</Typography>
      </header>
      {loading &&
        <div className="loading">
          <CircularProgress size={40} />
          <Typography variant="body1">S'estan carregant les dades...</Typography>
        </div>
      }
      {error &&
        <div className="error">
          <Typography variant="body1">{`${error}`}</Typography>
        </div>
      }
      {!loading && !error && data && <Diccionari {...{ data, paraula, setParaula }} />}
    </Container>
  );
}

export default App;