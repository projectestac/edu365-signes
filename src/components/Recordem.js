import React, { useState } from 'react';

import RecordemSelect from './RecordemSelect.js';
import Paraula, { RECORDEM } from './Paraula.js';

function Recordem({ data, paraulaInicial }) {

  const [paraula, setParaula] = useState(paraulaInicial);
  const [videoURL, setVideoURL] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  return (
    <main>
      <RecordemSelect {...{ data, setParaula }} />
      {paraula && <Paraula {...{ paraula, mode: RECORDEM, videoURL, setVideoURL, audioURL, setAudioURL }} />}
    </main>
  );
}

export default Recordem;