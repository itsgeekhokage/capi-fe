/** @format */

import { useTheme } from "@emotion/react";
import { Add, AddCircleTwoTone, Queue, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

const Dynamic_Type = ({ options, setOptions }) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const [openSublists, setOpenSublists] = useState({});
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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleOptionChange = (optionToUpdate, key, value) => {
    optionToUpdate[key] = value;
    setOptions([...options]);
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

  const handleHasComment = (optionToUpdate, value) => {
    optionToUpdate["comments"] = value;
    optionToUpdate.sublist = [];
    setOptions([...options]);
  };

  const renderOption = (option, parentOption = null) => (
    <Box
      key={option.id}
      sx={{ marginLeft: parentOption ? "1rem" : "0", padding: "0.25rem" }}
      >
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
          >
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
    <div>
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
    </div>
  );
};

export default Dynamic_Type;
