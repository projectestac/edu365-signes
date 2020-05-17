import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function RecordemSelect({ data, setParaula }) {

  const [text, setText] = useState('');

  const handleChange = (ev => {
    setText(ev.target.value);
  });

  const handleInput = (ev => {
    console.log(ev.target.value);
  });

  return (
    <div className="recordem-select">
      <Form.Group controlId="enterText">
        <Form.Label>Escriviu una paraula o feu clic al botó per triar-ne una a l'atzar:</Form.Label>
        <Form.Control
          type="password"
          placeholder=""
          value={text}
          onChange={handleChange}
          onInput={handleInput}
        />
      </Form.Group>
    </div>
  );
}

export default RecordemSelect;
