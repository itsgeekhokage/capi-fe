import { Done, RemoveCircle } from '@mui/icons-material';
import { Paper, TextField } from '@mui/material';
import React from 'react'

const OptionComponent = ({handleRemoveOption, option}) => {
    
  return (
    <Paper>
      <TextField
        value={option}
        onChange={(e) => handleValueChange(e.target.value)}></TextField>
        <Done/>
      <RemoveCircle onClick={() => handleRemoveOption(index)} />
    </Paper>
  );
}

export default OptionComponent
