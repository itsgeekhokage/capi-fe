/** @format */

import { AddCircle, Done, RemoveCircle } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

const Static2_Type = ({options, setOptions}) => {

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
    <Box sx={{padding : "2rem"}}>
      <Button variant="contained" color="info" onClick={handleAddOption} sx={{display : "flex",  gap: ".5rem"}}>
        <AddCircle />  Add Options
      </Button>
      {options.map((option, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
          <TextField
            size="small"
            value={option}
            onChange={(e) => handleValueChange(index, e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton>
            <RemoveCircle onClick={() => handleRemoveOption(index)} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default Static2_Type;
