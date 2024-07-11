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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EditControl = () => {
  const theme = useTheme();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name : "",
    path : "",
    type : ""
  })

  useEffect(()=> {
    const {name, path, type} = location.state;
    setFormData({name, path, type});
  }, [])

  const handleChange = (name, value) => {
    setFormData({
      ...formData, [name] : value
    })
  }

  const handleSubmit = async () => {
    const id = location.state?.id;
    if (!id) {
      alert("ID is not defined");
      return;
    }

    const updatedData = { ...formData, updated_by: "2" };

    try {
      const apiUrl = `${import.meta.env.VITE_HOST_API}/controls/update/${id}`;

      if (!import.meta.env.VITE_HOST_API) {
        console.error("Environment variable VITE_HOST_API is not defined");
        return;
      }

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Response was not ok");
      }

      const responseData = await response.json();
      alert(responseData.message);
    } catch (error) {
      console.log("Error:", error);
    }
  };


  return (
    <Paper sx={{ padding: "1vw" }}>
      <Typography variant="h4">Dashboard : Edit Controls</Typography>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1vw",
          margin: "1vw 0",
        }}>
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
          }}></TextField>
        <TextField
          label="path"
          fullWidth
          variant="standard"
          value={formData.path}
          onChange={(e) => handleChange("path", e.target.value)}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
          }}></TextField>
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
            onChange={(e) => handleChange("type", e.target.value)}
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
        }} onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
};

export default EditControl;
