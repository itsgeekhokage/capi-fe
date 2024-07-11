/** @format */

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { SearchOutlined } from "@mui/icons-material";



const ControlsSelection = ({
  title,
  controlSet,
  selectedControls,
  onSelect,
  onRemove,
}) => {
  const theme = useTheme();
  return (
    <Box
      mb={2}
      sx={{ width: "45%" }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        color={theme.palette.text.primary}>
        {title}
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        mt={1}>
        {selectedControls.map((item, key) => (
          <Chip
            key={key}
            label={item.name}
            onDelete={() => onRemove(item)}
          />
        ))}
      </Box>
      <Divider sx={{ bgcolor: theme.palette.text.primary, marginY: "10px" }} />
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}>
        {controlSet.map((item, key) => (
          <Chip
            key={key}
            label={item.name}
            clickable
            onClick={() => onSelect(item)}
          />
        ))}
      </Box>
    </Box>
  );
};

const CreateRole = () => {
  const [formData, setFormData] = useState({
    name: "",
    controlsSet1: [],
    controlsSet2: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [controlSet1, setControlSet1] = useState([]);
  const [controlSet2, setControlSet2] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();

  const handleControlSelect = (control, set) => {
    const updatedControls = [...formData[set], control];
    setFormData({ ...formData, [set]: updatedControls });
  };

  const handleControlRemove = (control, set) => {
    const updatedControls = formData[set]?.filter((item) => item !== control);
    setFormData({ ...formData, [set]: updatedControls });
  };

  const handleRoleNameChange = (e) => {
    const roleName = e.target.value;
    setFormData({ ...formData, name: roleName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      controls: [
        ...formData.controlsSet1.map((item) => item.id),
        ...formData.controlsSet2.map((item) => item.id),
      ],
      updated_by: "1",
    };
    console.log(data);
     try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/roles/create/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Internal server error");
      }

      const responseData = await response.json();

      alert(responseData.message);

      setFormData({
        name : "",
        controlsSet1 : [],
        controlsSet2 : []
      })
    } catch (error) {
      console.log(error);
    }
  };

  const filterControls = (controls) =>
    controls.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchControls = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/controls/get/all`
        );
        if (!response.ok) {
          alert("internal server error");
          throw new Error("reponse was not okk");
        }
        const data = await response.json();
        const controls = data.data;

        setControlSet1(controls.filter(
          (control) => control.type === "admin"
        ));
        setControlSet2(controls.filter(
          (control) => control.type === "agent"
        ));
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchControls();
    }, []);

  return (
    <Box sx={{ maxWidth: "90vw", margin: "auto", padding: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Typography
          variant="h3"
          gutterBottom
          color={theme.palette.text.primary}>
          Create Role
        </Typography>
        <Box sx={{ display: "flex", gap: "1vw" }}>
          <TextField
            size="small"
            variant="standard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{
              color: theme.palette.background.default,
              backgroundColor: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              },
            }}
            onClick={() => navigate("/admin/controls/all")}>
            Controls Panel
          </Button>
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Role Name"
          variant="outlined"
          margin="normal"
          value={formData.name}
          onChange={handleRoleNameChange}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
          }}
        />
        <Box sx={{ display: "flex", gap: "2vw" }}>
          <ControlsSelection
            title="Admin Controls"
            controlSet={filterControls(controlSet1)}
            selectedControls={formData.controlsSet1}
            onSelect={(control) => handleControlSelect(control, "controlsSet1")}
            onRemove={(control) => handleControlRemove(control, "controlsSet1")}
          />
          <ControlsSelection
            title="Agent Controls"
            controlSet={filterControls(controlSet2)}
            selectedControls={formData.controlsSet2}
            onSelect={(control) => handleControlSelect(control, "controlsSet2")}
            onRemove={(control) => handleControlRemove(control, "controlsSet2")}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="secondary">
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateRole;
