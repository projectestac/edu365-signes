/*!
 *  File    : components/Diccionari.js
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
import DiccSelect from './DiccSelect.js';
import Paraula, { DICCIONARI } from './Paraula.js';

function Diccionari({ settings, data, paraulaInicial }) {

  const [paraula, setParaula] = useState(paraulaInicial);
  const [videoURL, setVideoURL] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  return (
    <main>
      <DiccSelect {...{ data, setParaula }} />
      {paraula && <Paraula {...{ settings, paraula, mode: DICCIONARI, videoURL, setVideoURL, audioURL, setAudioURL }} />}
    </main>
  );
}

export default Diccionari;