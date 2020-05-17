import React, { useState } from 'react';

import RecordemSelect from './RecordemSelect';
import Paraula from './Paraula';

function Recordem({ data }) {

  const [paraula, setParaula] = useState(null);

  return (
    <main>
      <RecordemSelect {...{ data, setParaula }} />
      {paraula && <Paraula {...{ paraula }} />}
    </main>
  );
}

export default Recordem;