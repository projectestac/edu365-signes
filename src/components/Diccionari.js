import React, { useState, useEffect } from 'react';
import { getQueryParam } from '../utils/utils';
import DiccSelect from './DiccSelect';
import Paraula from './Paraula';

function Diccionari({ data }) {

  const [paraula, setParaula] = useState(null);

  useEffect(() => {
    const qp = getQueryParam('paraula').toUpperCase();
    if (qp) {
      setParaula(data.paraules.find(p => p.paraula === qp));
    }
  })

  return (
    <main>
      <DiccSelect {...{ data, paraula, setParaula }} />
      {paraula && <Paraula {...{ paraula }} />}
    </main>
  );
}

export default Diccionari;