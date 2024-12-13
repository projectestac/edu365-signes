import React, { useState, useEffect } from 'react';
import { getQueryParam } from '../utils/utils';
import DiccSelect from './DiccSelect';
import Paraula, { DICCIONARI } from './Paraula';

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