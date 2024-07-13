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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AddCircleTwoTone, Queue, Remove, Add } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dynamic_Type from "./Dynamic_Type";
import Static2_Type from "./Static2_Type";

const EditTag = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [tagId, setTagId] = useState();
  const [formData, setFormData] = useState({
    isDefault: false,
    tag: "",
    placeholder: "",
    desposition_type: "",
    question: "",
  });

  const [isQuestionTag, setIsQuestionTag] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let {
        id,
        default: isDefault,
        tag,
        placeholder,
        desposition_type,
        desposition,
      } = location.state;
      desposition = await JSON.parse(desposition);
      setFormData({
        isDefault,
        tag,
        placeholder,
        desposition_type,
        question: desposition.question?.question_text,
      });
      setIsShortAnswer(desposition?.question?.has_question);
      setOptions(desposition?.primary_breakdown);
      setTagId(id);
      console.log(location.state);
    };

    const fetchProjectData = async (project) => {
      let { id, tag, placeholder, desposition_type, desposition, is_active } =
        location.state;
      console.log(location.state.tag);
      console.log(formData);
      desposition = await JSON.parse(desposition);
      setFormData({
        tag,
        placeholder,
        desposition_type,
        is_active,
        question: desposition ? desposition.question?.question_text : "",
      });
      setIsShortAnswer(desposition?.question?.has_question);
      setOptions(desposition?.primary_breakdown || []);
      setTagId(id);
    };

    if (location.pathname == "/admin/projects/tag/edit") {
      setIsQuestionTag(false);
      fetchProjectData(location.state);
    } else {
      fetchData();
    }
  }, [location]);

  const handleFormData = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (req, res) => {
    isQuestionTag ? handleQuestionTagSubmit() : handleProjectTagSubmit();
  };

  const handleQuestionTagSubmit = async () => {
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

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/questiontags/update/${tagId}`,
        {
          method: "PUT",
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
      desposition: JSON.stringify(despo),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/projecttags/update/${tagId}`,
        {
          method: "PUT",
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

  const [isShortAnswer, setIsShortAnswer] = useState(true);
  const [options, setOptions] = useState([]);

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
          {isQuestionTag ? "Edit Question Tag" : "Edit Project Tag"}{" "}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}>
          Save
        </Button>
      </Box>
      <Box
        display={"flex"}
        gap={"1vw"}>
        {isQuestionTag ? (
          <Box
            checked={formData.isDefault}
            sx={{ display: "flex", alignItems: "center" }}
            onChange={() =>
              setFormData({ ...formData, isDefault: !formData.isDefault })
            }>
            Default:{" "}
            <Switch
              color="warning"
              checked={formData.isDefault}
            />
          </Box>
        ) : (
          <Box
            checked={formData.is_active}
            sx={{ display: "flex", alignItems: "center" }}
            onChange={() =>
              setFormData({ ...formData, is_active: !formData.is_active })
            }>
            Active:{" "}
            <Switch
              color="warning"
              checked={formData.is_active}
            />
          </Box>
        )}

        <TextField
          fullWidth
          placeholder="Question Tag"
          variant="outlined"
          label="Question Tag"
          size="small"
          value={formData.tag}
          contentEditable={false}
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

export default EditTag;
