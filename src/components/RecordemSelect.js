import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const DEAD_KEYCODES = [13, 16, 17, 18, 19, 20, 27, 35, 36, 37, 38, 39, 40, 91, 93, 224];

function RecordemSelect({ data: { paraules }, setParaula }) {

  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleChange = ev => {
    setText(ev.target.value.toUpperCase());
  };

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
      const paraula = paraules.find(p => p.paraula === text);
      if (paraula)
        setParaula(paraula);
      else
        setError('Encara no tenim aquesta paraula!');
    }
  }

  const getRandom = () => {
    setParaula(null);
    const index = Math.round(Math.random() * paraules.length);
    const paraula = paraules[index];
    setText(paraula.paraula.toUpperCase());
  }

  return (
    <div className="recordem-select">
      <label className="recordem-input-label">En aquesta activitat has d'endevinar la paraula amagada</label>
      <label htmlFor="recordem-enter-text" className="recordem-input-label">Demana a algú que t'escrigui una paraula o fes clic al dau per triar-ne una a l'atzar:</label>
      <InputGroup className="recordem-input-text" >
        <Form.Control
          className="dotsfont"
          id="recordem-enter-text"
          type="text"
          placeholder=""
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <InputGroup.Append className="recordem-input-random">
          <Button
            variant="outline-primary"
            onClick={getRandom}
            title="Escull una paraula a l'atzar"
          >
            <div style={{ width: '1rem' }} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Button
        className="recordem-select-button"
        variant="primary"
        onClick={checkParaula}
      >
        Endevina-ho!
      </Button>
      {error &&
        <Alert
          className="recordem-select-error"
          variant="danger"
        >
          {error}
        </Alert>
      }
    </div>
  );
}

export default RecordemSelect;
