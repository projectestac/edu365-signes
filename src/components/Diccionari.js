import React, { useState } from 'react';
import DiccSelect from './DiccSelect';
import Paraula from './Paraula';

function Diccionari({ data }) {
  
  const [paraula, setParaula] = useState(null);

  return (
    <main>
      <DiccSelect {...{ data, paraula, setParaula }} />
      {paraula && <Paraula {...{ paraula }} />}
    </main>
  );
}

export default Diccionari;