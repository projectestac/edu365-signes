import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function ParaulaRecordem({ paraulaObj: { paraula, so, imatge }, imatgeVisible, setImatgeVisible, replay }) {

  const [resposta, setResposta] = useState('');
  const [checkRespostaEnabled, setCheckRespostaEnabled] = useState(true);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const [pistes, setPistes] = useState(0);
  const [intents, setIntents] = useState(0);
  const okRef = useRef(null);
  const errRef = useRef(null);

  const handleKeyDown = ev => {
    if (ev.keyCode == 13) {
      ev.preventDefault();
      checkResposta();
    }
    else if (error)
      setError('');
  }

  const handleResposta = ev => {
    setResposta(ev.target.value.toUpperCase());
  }

  const checkResposta = () => {
    if (!resposta)
      setError('Has d\'escriure una resposta!');
    else {
      setIntents(intents + 1);
      if (resposta.toUpperCase() === paraula.toUpperCase()) {
        setOk(true);
        setCheckRespostaEnabled(false);
      }
      else
        setError('No és correcte. Torna a provar-ho!');
    }
  }

  useEffect(() => {
    if (ok && okRef.current)
      okRef.current.scrollIntoView();
    else if (error && errRef.current)
      errRef.current.scrollIntoView();
  }, [ok, error]);

  const handleImatge = () => {
    setImatgeVisible(!imatgeVisible);
    setPistes(pistes | 1);
  }

  const handleVeu = () => {
    replay(true);
    setPistes(pistes | 2);
  }

  return (
    <>
      {(imatge || so) &&
        <div className="paraula-pistes">
          <label>{`No saps què és? Aquí tens ${imatge && so ? 'dues pistes' : 'una pista'}:`}</label>
          <div>
            {imatge &&
              <Button onClick={handleImatge}>
                {imatgeVisible ? 'AMAGA LA' : 'MOSTRA UNA'} IMATGE
              </Button>
            }
            {so &&
              <Button onClick={handleVeu}>
                DIGUES-HO AMB VEU
              </Button>
            }
          </div>
        </div>
      }
      <Form.Group className="paraula-comprova">
        <Form.Label>Saps què estic dient? Escriu-ho aquí i comprova si ho has encertat:</Form.Label>
        <div className="resposta">
          <Form.Control
            type="text"            
            value={resposta}
            disabled={!checkRespostaEnabled}
            onChange={handleResposta}
            onKeyDown={handleKeyDown}
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
          />
          <Button
            className="recordem-check-button"
            variant="primary"
            disabled={!checkRespostaEnabled}
            onClick={checkResposta}
          >
            COMPROVA-HO
          </Button>
        </div>
      </Form.Group>
      <div className="paraula-notificacio">
        {error &&
          <Alert variant="danger" ref={errRef}>
            {error}
          </Alert>
        }
        {ok &&
          <Alert variant="success" ref={okRef}>
            {`Molt bé! Has endevinat la resposta correcta ${intents === 1 ? 'a la primera' : `en ${intents} intents`}, ${pistes === 0 ? 'sense cap pista' : pistes === 3 ? 'amb dues pistes' : 'amb només una pista'}!`}
          </Alert>
        }
      </div>
    </>
  );
}

export default ParaulaRecordem;