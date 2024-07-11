/** @format */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const TestModal = ({ open, handleClose, sendDataToParent, handleOpenNext }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendData = () => {
    sendDataToParent(inputText);
    handleClose();
    setInputText(""); // Clear input text after sending data
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2">
          Modal 2
        </Typography>
        <TextField
          id="input-text"
          label="Enter Text"
          variant="outlined"
          value={inputText}
          onChange={handleInputChange}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button
          color="info"
          onClick={handleSendData}>
          Send Data to Previous Modal
        </Button>
        <Button
          color="success"
          onClick={handleOpenNext}>
          Open Another Modal
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default TestModal;
