import React, { useState } from 'react';
import DiccSelect from './DiccSelect.js';
import Paraula, { DICCIONARI } from './Paraula.js';

function Diccionari({ data, paraulaInicial }) {

  const [paraula, setParaula] = useState(paraulaInicial);
  const [videoURL, setVideoURL] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  return (
    <main>
      <DiccSelect {...{ data, setParaula }} />
      {paraula && <Paraula {...{ paraula, mode: DICCIONARI, videoURL, setVideoURL, audioURL, setAudioURL }} />}
    </main>
  );
}

export default Diccionari;