/** @format */

import {
  AddCircle,
  AddCircleTwoTone,
  RemoveCircle,
  RemoveCircleTwoTone,
} from "@mui/icons-material";
import { Box, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import OptionComponent from "./OptionComponent";


const Static2_Type = () => {
  let [options, setOptions] = useState([]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  }

  const handleRemoveOption = (item) => {
    let newOptions = options.filter((opt, index) => item != index)
    setOptions(newOptions)
  }

  const handleValueChange = (index, value) => {
    let newOptions = options;
    console.log(newOptions)
    setOptions(newOptions)
  }

  return (
    <Box>
      <AddCircle onClick={handleAddOption}/>
      {options.map((option,index) => <OptionComponent handleRemoveOption={handleRemoveOption} option={option}/>)}
    </Box>
  );
};

export default Static2_Type;
