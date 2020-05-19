import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const DEAD_KEYCODES = [13, 16, 17, 18, 19, 20, 27, 35, 36, 37, 38, 39, 40, 91, 93, 224];

function RecordemSelect({ data, setParaula }) {

  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (ev => {
    setText(ev.target.value);
  });

  const handleKeyDown = ev => {
    if (ev.keyCode == 13) {
      ev.preventDefault();
      checkParaula();
    }
    else if (!DEAD_KEYCODES.includes(ev.keyCode)) {
      setParaula(null);
      if (error)
        setError(null);

    }
  }

  const checkParaula = () => {
    if (!text)
      setError('Has d\'escriure una paraula');
    else {
      const txMaj = text.toUpperCase();
      const paraula = data.paraules.find(p => p.paraula === txMaj);
      if (paraula)
        setParaula(paraula);
      else
        setError('Vaja! Aquesta paraula no la tenim encara al diccionari.')
    }
  }


  return (
    <div className="recordem-select">
      <Form.Group controlId="enterText">
        <Form.Label>Escriviu una paraula o feu clic al botó per triar-ne una a l'atzar:</Form.Label>
        <Form.Control
          type="password"
          placeholder=""
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Form.Group>
      {error &&
        <Alert variant="danger">
          {error}
        </Alert>
      }
    </div>
  );
}

export default RecordemSelect;
