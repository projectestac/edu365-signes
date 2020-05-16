import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';

function DiccSelect({ data, paraula, setParaula }) {

  const { classificacions, families, paraules } = data;

  const [classificacio, setClassificacio] = useState(0);
  const [familia, setFamilia] = useState(0);

  return (
    <div className="dicc-select">
      <Form.Group controlId="classificacions">
        <Form.Label>Selecciona una classificació</Form.Label>
        <Form.Control
          as="select"
          value={classificacio}
          onChange={ev => setClassificacio(Number(ev.target.value))}
        >
          <option key={0} value={0}>Totes les classificacions</option>
          {classificacions.map(({ id, nom }) => <option key={id} value={id}>{nom}</option>)}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="families">
        <Form.Label>Selecciona una família</Form.Label>
        <Form.Control
          as="select"
          value={familia}
          onChange={ev => setFamilia(Number(ev.target.value))}
        >
          <option key={0} value={0}>Totes les families</option>
          {families
            .filter(f => classificacio === 0 || f.classificacio === classificacio)
            .map(({ id, nom }) => <option key={id} value={id}>{nom}</option>)}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="paraula">
        <Form.Label>Selecciona o escriu una paraula</Form.Label>
        <Typeahead
          clearButton
          id="select-paraula"
          multiple={false}
          labelKey="paraula"
          onChange={values => setParaula(values && values.length > 0 ? values[0] : null)}
          options={paraules.filter(p => !familia || p.families.includes(familia))}
          placeholder="..."
        />
      </Form.Group>
    </div>
  );
}

export default DiccSelect;