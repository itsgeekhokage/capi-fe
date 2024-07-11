/** @format */

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const TagsModal = ({ tags, open, setOpen, selectedTags, setSelectedTags }) => {
  const theme = useTheme();

  const [checkedTags, setCheckedTags] = useState(selectedTags);

  const handleCheckboxChange = (tag) => {
    console.log(tag)
    setCheckedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setSelectedTags(checkedTags);
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{width : "90vw",margin : "auto"}}
        >
        <DialogTitle>Tags Modal</DialogTitle>
        <DialogContent sx={{width : "85vw"}}>
          <Paper sx={{ padding: 2, display : "flex", flexWrap : "wrap", width: "40vw"
           }}>
            {tags.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", padding: 1, width: "17vw" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      checked={checkedTags.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  }
                  label={item.tag}
                />
              </Box>
            ))}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default TagsModal;
