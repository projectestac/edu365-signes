import React, { useState, useEffect } from 'react';
import { getQueryParam } from '../utils/utils';
import DiccSelect from './DiccSelect';
import Paraula, { DICCIONARI } from './Paraula';

function Diccionari({ data }) {

  const [paraula, setParaula] = useState(null);

  useEffect(() => {
    const qp = getQueryParam('paraula').toUpperCase();
    if (!paraula && qp) {
      setParaula(data.paraules.find(p => p.paraula === qp));
    }
  })

  return (
    <main>
      <DiccSelect {...{ data, setParaula }} />
      {paraula && <Paraula {...{ paraula, mode: DICCIONARI }} />}
    </main>
  );
}

export default Diccionari;