/** @format */

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CreateControl = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    type: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    formData.updated_by = "1";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/controls/create/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Internal server error");
      }

      const responseData = await response.json();
      setFormData({
        name: "",
        path: "",
        type: "",
      });
      console.log(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Paper sx={{ padding: "1vw" }}>
        <Typography variant="h4">Dashboard : Create Controls</Typography>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1vw",
            margin: "1vw 0",
          }}>
          <TextField
            label="Name"
            fullWidth
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
            value={formData.name}
            onChange={(e) =>
              handleInputChange("name", e.target.value)
            }></TextField>
          <TextField
            label="path"
            fullWidth
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
            value={formData.path}
            onChange={(e) =>
              handleInputChange("path", e.target.value)
            }></TextField>
          <FormControl>
            <InputLabel
              id="type-label"
              sx={{
                color: theme.palette.text.primary,
                "&.Mui-focused": {
                  color: theme.palette.text.primary,
                },
              }}>
              Type
            </InputLabel>
            <Select
              labelId="type-label"
              value={formData.type}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.text.primary,
                  },
                },
                "& .MuiSelect-icon": {
                  color: theme.palette.text.primary,
                },
              }}
              onChange={(e) => handleInputChange("type", e.target.value)}>
              <MenuItem value="">
                <em>Select Type</em>
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="agent">Agent</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            color: theme.palette.background.default,
            backgroundColor: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
          onClick={handleSubmit}>
          Create Controls
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateControl;
