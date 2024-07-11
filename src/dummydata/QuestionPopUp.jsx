/** @format */

import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  DialogActions,
  IconButton,
  FormControl,
  Switch,
} from "@mui/material";
import { AddCircleTwoTone, RemoveCircleTwoTone } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const NestedModal = ({
  open,
  handleClose,
  handleOpenNext,
  handleAddMessage,
  modalIndex,
}) => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([""]);

  const handleSubmit = () => {
    handleAddMessage(input, modalIndex);
    setInput("");
  };

  const handleTextBoxInput = (e) => {
    setOptions(e.target.value.split("\n"));
    setInput(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`modal-title-${modalIndex}`}
      aria-describedby={`modal-description-${modalIndex}`}>
      <Box sx={modalStyle}>
        <Typography
          id={`modal-title-${modalIndex}`}
          variant="h6"
          component="h2">
          Modal {modalIndex + 1}
        </Typography>
        <TextField
          id="filled-multiline-static"
          multiline
          rows={4}
          defaultValue=""
          variant="filled"
          fullWidth
          value={input}
          onChange={handleTextBoxInput}
          margin="normal"
        />
        <FormControl>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{ maxHeight: "200px", overflowY: "auto" }}>
            {options.map((option, index) => (
              <Box
                display={"flex"}
                key={index}
                flexDirection={"column"}>
                <Box
                  key={index}
                  display="flex"
                  justifyContent={"space-between"}
                  gap={1}>
                  <TextField
                    fullWidth
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    size="small"
                    placeholder="Option text"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleAddOption(index)}>
                    <AddCircleTwoTone />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveOption(index)}>
                    <RemoveCircleTwoTone />
                  </IconButton>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  mt={1}
                  gap={1}
                  sx={{ cursor: "pointer" }}>
                  <Box onClick={()=>handleOpenNext(option)}>
                    <IconButton
                      size="small"
                      sx={{ padding: 0.5 }}>
                      <AddCircleTwoTone sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography
                      component="span"
                      sx={{ fontSize: 10 }}>
                      Add sub options
                    </Typography>
                  </Box>
                  <Switch color="info" />
                  <IconButton
                    size="small"
                    sx={{ padding: 0.5 }}>
                    <Typography
                      component="span"
                      sx={{ fontSize: 10 }}>
                      Add Comments
                    </Typography>
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </FormControl>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth>
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

const QuestionPopUp = ({ openModals, setOpenModals, handleOpenNext }) => {
  const [messages, setMessages] = useState([]);

  const handleCloseModal = (index) => {
    setOpenModals((prev) => {
      const newModals = [...prev];
      newModals[index] = false;
      return newModals;
    });
  };

  const handleAddMessage = (message, modalIndex) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      if (newMessages[modalIndex]) {
        newMessages[modalIndex] = `${newMessages[modalIndex]}\n${message}`;
      } else {
        newMessages[modalIndex] = message;
      }
      return newMessages;
    });
  };

  return (
    <div>
      {openModals.map((data, index) => (
        <NestedModal
          key={index}
          open={true}
          data={data}
          handleClose={() => handleCloseModal(index)}
          handleOpenNext={handleOpenNext}
          handleAddMessage={handleAddMessage}
          modalIndex={index}
        />
      ))}
    </div>
  );
};

export default QuestionPopUp;
