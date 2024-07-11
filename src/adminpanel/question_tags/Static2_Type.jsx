/** @format */

import { AddCircle, Done, RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

const Static2_Type = () => {
  let [options, setOptions] = useState([]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    let newOptions = options.filter((_, i) => index !== i);
    setOptions(newOptions);
  };

  const handleValueChange = (index, value) => {
    let newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <Box>
      <IconButton>
        <AddCircle onClick={handleAddOption} />
      </IconButton>
      {options.map((option, index) => (
        <Paper
          key={index}
          sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
          <TextField
            value={option}
            onChange={(e) => handleValueChange(index, e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton>
            <RemoveCircle onClick={() => handleRemoveOption(index)} />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
};

export default Static2_Type;
