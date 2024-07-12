/** @format */

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Switch,
  TextField,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { AddCircleTwoTone, Queue, Remove, Add } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Dynamic_Type from "./Dynamic_Type";
import Static2_Type from "./Static2_Type";

const CreateTag = () => {
  const theme = useTheme();
  const location = useLocation();
  const [formData, setFormData] = useState({
    isDefault: false,
    tag: "",
    placeholder: "",
    desposition_type: "",
    question: "",
  });

  const [isQuestionTag, setIsQuestionTag] = useState(true);
  const [project, setProject] = useState({});
  const [isShortAnswer, setIsShortAnswer] = useState(true);
  const [options, setOptions] = useState([]);

  const handleFormData = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (req, res) => {
    isQuestionTag ? handleQuesitonTagSubmit() : handleProjectTagSubmit();
  };

  const handleQuesitonTagSubmit = async () => {
    const despo = {
      question: {
        has_question: isShortAnswer,
        question_text: formData?.desposition || "",
      },
      primary_breakdown: options || [],
    };

    const updatedFormData = {
      ...formData,
      desposition: JSON.stringify(despo),
    };

    console.log(updatedFormData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/questiontags/create/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Internal server error");
      }

      const responseData = await response.json();
      setFormData({
        isDefault: false,
        tag: "",
        placeholder: "",
        desposition_type: "",
        desposition: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleProjectTagSubmit = async () => {
    const despo = {
      question: {
        has_question: isShortAnswer,
        question_text: formData?.desposition || "",
      },
      primary_breakdown: options || [],
    };

    const updatedFormData = {
      ...formData,
      project_code: project.project_code,
      desposition: JSON.stringify(despo),
    };

    console.log(updatedFormData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/projecttags/create/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Internal server error");
      }

      const responseData = await response.json();
      setFormData({
        isDefault: false,
        tag: "",
        placeholder: "",
        desposition_type: "",
        desposition: "",
      });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (location.pathname == "/admin/projects/tag/create") {
      setIsQuestionTag(false);
      setProject(location.state);
    }
  }, []);

  useEffect(()=>{
    setOptions([]);
  }, [formData.desposition_type])


  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "1vw",
        }}>
        <Typography variant="h4">
          {" "}
          {isQuestionTag ? "Create Question Tag" : "Create Project Tag"}{" "}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}>
          Save
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="1vw">
        {isQuestionTag ? (
          <Box
            checked={formData.isDefault}
            sx={{ display: "flex", alignItems: "center" }}
            onChange={() =>
              setFormData({ ...formData, isDefault: !formData.isDefault })
            }>
            Default: <Switch color="warning" />
          </Box>
        ) : (
          ""
        )}

        <TextField
          fullWidth
          placeholder="Question Tag"
          variant="outlined"
          label="Question Tag"
          size="small"
          value={formData.tag}
          onChange={(e) => handleFormData("tag", e.target.value)}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
          }}
        />

        <TextField
          fullWidth
          placeholder="Placeholder Text"
          size="small"
          variant="outlined"
          label="Placeholder Text"
          value={formData.placeholder}
          onChange={(e) => handleFormData("placeholder", e.target.value)}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
          }}
        />

        <FormControl sx={{ width: "200px" }}>
          <InputLabel>Question Type</InputLabel>
          <Select
            fullWidth
            variant="outlined"
            value={formData.desposition_type}
            width={"200px"}
            onChange={(e) => handleFormData("desposition_type", e.target.value)}
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}>
            <MenuItem value="static">Static</MenuItem>
            <MenuItem value="dynamic">Dynamic</MenuItem>
            <MenuItem value="static2">Static2</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ marginTop: "2rem", display: "flex", gap: "1vw" }}>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={isShortAnswer}
                color="success"
                onChange={() => setIsShortAnswer(!isShortAnswer)}
              />
            }
            label="Question"
          />
        </FormControl>
        {isShortAnswer && (
          <TextField
            fullWidth
            placeholder="Question text"
            size="small"
            variant="outlined"
            value={formData.question}
            onChange={(e) => handleFormData("question", e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
        )}
      </Box>
      {formData.desposition_type == "static" && ""}
      {formData.desposition_type == "dynamic" && (
        <Dynamic_Type
          options={options}
          setOptions={setOptions}
        />
      )}
      {formData.desposition_type == "static2" && (
        <Static2_Type
          options={options}
          setOptions={setOptions}
        />
      )}
    </Box>
  );
};

export default CreateTag;
