/** @format */

import { useTheme } from "@emotion/react";
import { Box, Button, InputLabel, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const inputStyle = { display: "flex", flexDirection: "column", gap: "0.5vw" };

const EditBasicProjectDetails = ({ project }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    project_code: "",
    status: "",
    deadline: "2030-05-25",
  });
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setFormData({
      project_name: project?.project_name,
      project_code: project?.project_code,
      status: project?.status,
      deadline: project?.deadline ? project.deadline.split("T")[0] : "",
    });
    setIsEdited(false);
  }, [project]);

  const theme = useTheme();

  const handleSave = async () => {
    try {
      const response = await fetch("/api/save-project-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Save successful:", result);
      setIsEdited(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    setIsEdited(true);
  };

  return (
    <Paper
      sx={{
        padding: "2vw",
        backgroundColor: theme.palette.background.default,
      }}>
      <Box
        display="flex"
        gap="1vw"
        flexWrap="wrap"
        justifyContent={"space-between"}
        sx={{
          "& > .MuiFormControl-root": {
            flexBasis: "calc(50% - 1vw)",
          },
        }}>
        <Box
          component="div"
          sx={inputStyle}>
          <InputLabel htmlFor="project_name">Project Name:</InputLabel>
          <TextField
            id="project_name"
            variant="standard"
            value={formData.project_name}
            fullWidth
            contentEditable={false}
            onChange={handleChange}
          />
        </Box>
        <Box
          component="div"
          sx={inputStyle}>
          <InputLabel htmlFor="project_code">Project Code:</InputLabel>
          <TextField
            id="project_code"
            variant="standard"
            value={formData.project_code}
            fullWidth
            contentEditable={false}
            onChange={handleChange}
          />
        </Box>
        <Box
          component="div"
          sx={inputStyle}>
          <InputLabel htmlFor="status">Status:</InputLabel>
          <TextField
            id="status"
            variant="standard"
            type="text"
            value={formData.status}
            fullWidth
            onChange={handleChange}
          />
        </Box>
        <Box
          component="div"
          sx={inputStyle}>
          <InputLabel htmlFor="deadline">Deadline:</InputLabel>
          <TextField
            id="deadline"
            variant="standard"
            type="date"
            value={formData.deadline}
            fullWidth
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        marginTop="1vw"
        sx={{
          opacity: isEdited ? 1 : 0,
          display: isEdited ? "flex" : "none",
          transform: isEdited ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}>
        <Button
          variant="contained"
          color="info"
          onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default EditBasicProjectDetails;
