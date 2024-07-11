/** @format */

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const Static2Question = ({ question }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const theme = useTheme();

  return (
    <FormControl
      sx={{
        width : "31vw",
        backgroundColor: theme.palette.background.default,
        padding : "1vw"
      }}>
      <Typography>{question.placeholder}</Typography>
      <Select
        multiple
        value={selectedOptions}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}>
        {question.options.map((option) => (
          <MenuItem
            key={option}
            value={option}>
            <Checkbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Static2Question;
