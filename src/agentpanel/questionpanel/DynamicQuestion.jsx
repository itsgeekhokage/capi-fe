/** @format */

import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const DynamicQuestion = ({ question }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const theme = useTheme();

  const handleChange = (level, option) => (event) => {
    const value = event.target.value;
    setSelectedOptions((prev) => {
      const updated = { ...prev, [level]: value };
      // Clear selections for deeper levels
      Object.keys(prev)
        .filter((key) => key > level)
        .forEach((key) => delete updated[key]);
      return updated;
    });
  };

  const renderOptions = (options, level = 0) => {
    const selectedOption = selectedOptions[level];
    const currentOptions = options.find((opt) => opt.text === selectedOption);

    return (
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <FormControl
          key={level}
          sx={{
            minWidth: 300,
            margin: "0.5em",
            backgroundColor: theme.palette.background.default,
          }}>
          <Select
            value={selectedOption || ""}
            onChange={handleChange(level, options)}
            label={
              level === 0 ? question.placeholder : `Option Level ${level + 1}`
            }>
            {options.map((option) => (
              <MenuItem
                key={option.text}
                value={option.text}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {selectedOption &&
            currentOptions?.hasOptions &&
            currentOptions.options &&
            renderOptions(currentOptions.options, level + 1)}
        </FormControl>
      </Box>
    );
  };

  return (
    <div style={{ width: "47vw" }}>
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5vw",
          padding: "1vw",
          backgroundColor: theme.palette.background.default,
        }}>
        <Typography>
          {question.id}. {question.tag}
        </Typography>
        <Typography>{question.placeholder}</Typography>
      </Box>
      {renderOptions(question.options)}
    </div>
  );
};

export default DynamicQuestion;
