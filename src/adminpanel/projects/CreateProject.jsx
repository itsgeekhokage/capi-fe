/** @format */

import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const CreateProject = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    project_name: "",
    project_code: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
     try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/projects/create/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      setFormData({
        project_name: "",
        project_code: "",
      });
      console.log(responseData.message);
      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{ p: 4, bgcolor: theme.palette.background.paper, borderRadius: 2 }}>
      <Typography
        variant="h3"
        color={theme.palette.text.primary}
        gutterBottom>
        Create Project
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off">
        <FormControl
          fullWidth
          margin="normal">
          <TextField
            id="project-name"
            name="project_name"
            label="Project Name"
            value={formData.project_name}
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          />
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined">
          <InputLabel
            id="project-code-label"
            sx={{
              color: theme.palette.text.primary,
              "&.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}>
            Project Code
          </InputLabel>
          <Select
            labelId="project-category-label"
            id="project_code"
            name="project_code"
            value={formData.project_code}
            onChange={handleChange}
            label="Project Code"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.text.primary,
                },
              },
              "& .MuiSelect-icon": {
                color: theme.palette.text.primary,
              },
            }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="mp-21">mp-21</MenuItem>
            <MenuItem value="cp-32">cp-32</MenuItem>
            <MenuItem value="up-mp7">up-mp7</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProject;
