import React, { useState } from 'react';

import RecordemSelect from './RecordemSelect';
import Paraula, { RECORDEM } from './Paraula';

function Recordem({ data }) {

  const [paraula, setParaula] = useState(null);

  return (
    <main>
      <RecordemSelect {...{ data, setParaula }} />
      {paraula && <Paraula {...{ paraula, mode: RECORDEM }} />}
    </main>
  );
}

export default Recordem;