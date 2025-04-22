/*!
 *  File    : components/RecordemSelect.js
 *  Created : 01/04/2025
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Mira què dic! - Diccionari multimèdia de la llengua de signes catalana
 *  https://mqdic.edigital.cat
 *
 *  @source https://github.com/projectestac/edu365-signes
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2021 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

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
      <div className="recordem-input-caixa">
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
          <InputGroup.Text className="recordem-input-random">
            <Button
              variant="outline-primary"
              onClick={getRandom}
              title="Escull una paraula a l'atzar"
            >
            </Button>
          </InputGroup.Text>
        </InputGroup>
        <Button
          className="recordem-select-button"
          variant="primary"
          onClick={checkParaula}
        >
          ENDEVINA-HO!
        </Button>
      </div>
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
