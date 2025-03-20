import React, { useState } from 'react';
import DiccSelect from './DiccSelect.js';
import Paraula, { DICCIONARI } from './Paraula.js';

function Diccionari({ data, paraulaInicial }) {

  const [paraula, setParaula] = useState(paraulaInicial);
  return (
    <main>
      <DiccSelect {...{ data, setParaula }} />
      {paraula && <Paraula {...{ paraula, mode: DICCIONARI }} />}
    </main>
  );
}

export default Diccionari;