import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

function DiccSelect({ data, paraula, setParaula }) {

  const { classificacions, families, paraules } = data;

  const [classificacio, setClassificacio] = useState(0);
  const [familia, setFamilia] = useState(0);

  const filterOptions = createFilterOptions({
    limit: 100,
  });

  return (
    <Paper className="dicc-select-area">
      <FormControl margin="normal">
        <InputLabel htmlFor="classificacions">Seleccioneu una classificació</InputLabel>
        <Select
          id="classificacions"
          onChange={ev => setClassificacio(ev.target.value)}
          value={classificacio}
        >
          <MenuItem key={0} value={0}>Totes les classificacions</MenuItem>
          {classificacions.map(({ id, nom }) => <MenuItem key={id} value={id}>{nom}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl margin="normal">
        <InputLabel htmlFor="families">Seleccioneu una família</InputLabel>
        <Select
          id="families"
          onChange={ev => setFamilia(ev.target.value)}
          value={familia}
        >
          <MenuItem key={0} value={0}>Totes les famílies</MenuItem>
          {families.filter(f => !classificacio || f.classificacio == classificacio)
            .map(({ id, nom }) => <MenuItem key={id} value={id}>{nom}</MenuItem>)}
        </Select>
      </FormControl>
      <Autocomplete
        className="dicc-select-paraula"
        margin="normal"
        options={paraules.filter(p => !familia || p.families.includes(familia))}
        getOptionLabel={p => p.paraula}
        value={paraula}
        onChange={(_ev, newValue) => setParaula(newValue)}
        renderInput={params => <TextField {...params} label="Seleccioneu una paraula" />}
        filterOptions={filterOptions}
      />
    </Paper>
  );
}

export default DiccSelect;