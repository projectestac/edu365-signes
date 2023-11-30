import React, { useState, useEffect } from 'react';
import { ClearButton, Typeahead } from 'react-bootstrap-typeahead';
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
          labelKey="paraula"
          onChange={values => setParaula(values && values.length > 0 ? values[0] : null)}
          options={paraules.filter(p => !familia || p.families.includes(familia))}
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