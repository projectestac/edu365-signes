/*!
 *  File    : components/DiccSelect.js
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
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';

function DiccSelect({ data: { classificacions, families, paraules }, setParaula }) {

  const [classificacio, setClassificacio] = useState(0);
  const [familia, setFamilia] = useState(0);

  return (
    <div className="dicc-select">
      <Form.Group controlId="classificacions">
        <Form.Label>Selecciona una classificació:</Form.Label>
        <Form.Select
          value={classificacio}
          onChange={ev => setClassificacio(Number(ev.target.value))}
        >
          <option key={0} value={0}>TOTES LES CLASSIFICACIONS</option>
          {classificacions.map(({ id, nom }) => <option key={id} value={id}>{nom}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="families">
        <Form.Label>Selecciona una família:</Form.Label>
        <Form.Select
          value={familia}
          onChange={ev => setFamilia(Number(ev.target.value))}
        >
          <option key={0} value={0}>TOTES LES FAMÍLIES</option>
          {families
            .filter(f => classificacio === 0 || f.classificacio === classificacio)
            .map(({ id, nom }) => <option key={id} value={id}>{nom}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="paraula">
        <Form.Label>Selecciona o escriu una paraula:</Form.Label>
        <Typeahead
          clearButton
          id="select-paraula"
          multiple={false}
          labelKey="label"
          onChange={(values) => { setParaula(values?.length > 0 ? values[0] : null); }}
          options={paraules.filter(p => !familia || p.families.includes(familia)).map(p => p)}
          placeholder="..."
          emptyLabel="No hi ha res amb aquest text"
          paginationText="Més paraules..."
          selectHintOnEnter={true}
        />
      </Form.Group>
    </div>
  );
}

export default DiccSelect;
