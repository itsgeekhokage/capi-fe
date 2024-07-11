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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AddCircleTwoTone, Queue, Remove, Add } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      let { id, isDefault, tag, placeholder, desposition_type, desposition } =
        location.state;
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
  const [options, setOptions] = useState([
    {
      id: 1,
      text: "",
      comments: false,
      sublist: [],
    },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [openSublists, setOpenSublists] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);
  const [width, setWidth] = useState(500);
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      const newWidth =
        e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth > 100 && newWidth < 800) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  const toggleSublist = (id) => {
    setOpenSublists((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


   const handleAddOption = (parentOption = null, isSubOption = false) => {
     const newOption = {
       id: Date.now(),
       text: "",
       comments: false,
       sublist: [],
     };
     if (parentOption && parentOption.comments) return;
     if (isSubOption && parentOption) {
       parentOption.sublist.push(newOption);
       setOpenSublists((prev) => ({
         ...prev,
         [parentOption.id]: true,
       }));
     } else if (parentOption) {
       const parentIndex = options.findIndex(
         (opt) => opt.id === parentOption.id
       );
       options.splice(parentIndex + 1, 0, newOption);
     } else {
       setOptions([...options, newOption]);
     }
     setSelectedOption(newOption);
     setOptions([...options]);
   };


  const handleRemoveOption = (optionToRemove, parentOption) => {
    if (parentOption) {
      parentOption.sublist = parentOption.sublist.filter(
        (option) => option.id !== optionToRemove.id
      );
      setOptions([...options]);
    } else {
      setOptions(options.filter((option) => option.id !== optionToRemove.id));
    }
    if (selectedOption && selectedOption.id === optionToRemove.id) {
      setSelectedOption(null);
    }
  };

  const handleOptionChange = (optionToUpdate, key, value) => {
    optionToUpdate[key] = value;
    setOptions([...options]);
  };

  const handleHasComment = (optionToUpdate, value) => {
    optionToUpdate["comments"] = value;
    optionToUpdate.sublist = [];
    setOptions([...options]);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderOption = (option, parentOption = null) => (
    <Box
      key={option.id}
      sx={{ marginLeft: parentOption ? "1rem" : "0", padding: "0.25rem" }}
      onMouseEnter={() => setHoveredOption(option.id)}
      onMouseLeave={() => setHoveredOption(null)}>
      <ListItem
        component={Box}
        elevation={selectedOption === option ? 3 : 1}
        sx={{
          backgroundColor:
            selectedOption === option
              ? "info.main"
              : theme.palette.background.default,
          borderRadius: "4px",
          cursor: "pointer",
          padding: "0 5px",
        }}
        onClick={() => {
          handleOptionSelect(option);
          toggleSublist(option.id);
        }}>
        <ListItemText>
          <TextField
            value={option.text}
            onChange={(e) => handleOptionChange(option, "text", e.target.value)}
            size="small"
            placeholder="Option text"
            fullWidth
            variant="standard"
          />
        </ListItemText>
        <ListItemSecondaryAction
          sx={{ display: hoveredOption === option.id ? "block" : "none" }}>
          {/* <Add
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={() => handleAddOption(option, false)}
          /> */}
          <Queue
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddOption(option, true);
            }}
          />
          <Remove
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveOption(option, parentOption);
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={openSublists[option.id]}>
        {option.sublist.length > 0 && (
          <List sx={{ padding: 0 }}>
            {option.sublist.map((subOption) => renderOption(subOption, option))}
          </List>
        )}
      </Collapse>
    </Box>
  );

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

      <Box
        sx={{ display: "flex", marginTop: "2rem" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        <Box
          ref={sidebarRef}
          sx={{
            width: `${width}px`,
            transition: "width 0.1s ease-out",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #ccc",
            position: "relative",
            marginRight: "1rem",
          }}>
          <Box
            sx={{
              width: "5px",
              cursor: "ew-resize",
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "#ddd",
              "&:hover": {
                width: "8px",
              },
            }}
            onMouseDown={handleMouseDown}
          />
          <Button
            onClick={handleAddOption}
            startIcon={<AddCircleTwoTone />}
            fullWidth
            color="info"
            sx={{ marginBottom: "1rem" }}>
            Add Option
          </Button>
          <List>{options.map((option) => renderOption(option))}</List>
        </Box>
        <Box sx={{ flexGrow: 1, paddingLeft: "1rem" }}>
          {selectedOption && (
            <Box sx={{ marginTop: "2rem" }}>
              <Typography variant="h6">Edit Option</Typography>
              <TextField
                fullWidth
                value={selectedOption.text}
                onChange={(e) =>
                  handleOptionChange(selectedOption, "text", e.target.value)
                }
                placeholder="Option text"
                size="small"
                sx={{ marginBottom: "1rem" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    color="info"
                    size="small"
                    checked={selectedOption.comments}
                    onChange={(e) =>
                      handleHasComment(selectedOption, e.target.checked)
                    }
                  />
                }
                label="Add Comments"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EditTag;
