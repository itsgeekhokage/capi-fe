/** @format */

import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  DialogActions,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";

import {
  AddCircleTwoTone,
  RemoveCircleTwoTone,
  ArrowRight,
  ArrowDropDown,
  Add,
  AddModerator,
  AddBusiness,
  Queue,
  Remove,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";

const EditQuestion = ({ question, open, setOpen }) => {
  const theme = useTheme();

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
    console.log(parentOption)
    if(parentOption.comments == true) return;
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

  const handleAddBaseOption = () => {
    setOptions([
      ...options,
      {
        id: Date.now(),
        text: "",
        comments: false,
        sublist: [],
      },
    ]);
  };

  const handleRemoveOption = (optionToRemove, parentOption) => {
    console.log(optionToRemove, parentOption);
    if (parentOption) {
      parentOption.sublist = parentOption.sublist.filter(
        (option) => option.id !== optionToRemove.id
      );
      setOptions([...options]);
    } else {
      console.log("hiii");
      setOptions(options.filter((option) => option.id !== optionToRemove.id));
      console.log(options.filter((option) => option.id !== optionToRemove.id));
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
    console.log(optionToUpdate, value);
    optionToUpdate["comments"] = value;
    optionToUpdate.sublist = [];
    setOptions([...options]);
  }

  const handleCloseModal = () => {
    setOpen(false);
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
          <Add
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={() => handleAddOption(option, false)}
          />
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
    <Dialog
      open={open}
      onClose={handleCloseModal}
      maxWidth="lg"
      height="80vh"
      fullWidth>
      <Box sx={{ width: "70%", padding: ".5rem" }}>
        <DialogTitle>
          <Typography variant="h4">{question.tag}</Typography>
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
              value={question.text || ""}
              onChange={(e) =>
                handleOptionChange(question, "text", e.target.value)
              }
              placeholder="Question text"
              size="small"
            />
          )}
        </DialogTitle>
        <Box display="flex">
          <Box
            sx={{
              width: "40%",
              borderRight: "1px solid #ccc",
              overflowY: "auto",
            }}>
            <Button
              onClick={() => handleAddBaseOption()}
              startIcon={<AddCircleTwoTone />}
              fullWidth
              color="info"
              sx={{ marginBottom: "1rem" }}>
              Add Option
            </Button>
            <Box sx={{ padding: "1rem" }}>
              <List>{options.map((option) => renderOption(option))}</List>
            </Box>
          </Box>

          {selectedOption && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "2rem",
              }}>
              <Box>
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
                        handleHasComment(
                          selectedOption,
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Add Comments"
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <DialogActions>
        <Button
          onClick={handleCloseModal}
          variant="contained"
          color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => console.log(options)}
          variant="contained"
          color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestion;
