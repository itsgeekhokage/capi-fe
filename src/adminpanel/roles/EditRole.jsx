/** @format */

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Search, SearchOutlined } from "@mui/icons-material";
import { updateRoles } from "../../apis/adminpanel/roles";

const EditRole = ({data}) => {
  const { roleId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    controlsSet1: [],
    controlsSet2: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [controlSet1, setControlSet1] = useState([]);
  const [controlSet2, setControlSet2] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const {name, access_controls} = location.state;
    const cset1 = access_controls.filter(item => item.type == "admin");
    const cset2 = access_controls.filter(item => item.type == "agent");

    setFormData({
      name,
      controlsSet1 : cset1,
      controlsSet2 : cset2
    })
  }, [location]);

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
    const roleId = location.state?.id;
    if(!roleId){
      alert("browser error");
    }
    const data = {
      name: formData.name,
      access_controls: [
        ...formData.controlsSet1.map((item) => item.id),
        ...formData.controlsSet2.map((item) => item.id),
      ],
      updated_by: "1",
    };

    console.log(data);

    const result = await updateRoles(roleId, data);
    console.log(result);
    if(result) navigate("/admin/roles/all");
    else alert("error")
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredControlSet1 = controlSet1.filter((control) =>
    control.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredControlSet2 = controlSet2.filter((control) =>
    control.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      const access_controls = data.data;

      setControlSet1(access_controls.filter((control) => control.type === "admin"));
      setControlSet2(access_controls.filter((control) => control.type === "agent"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchControls();
  }, []);

  const handleDelete = async () => {
    const roleId = location.state?.id;
    if (!roleId) {
      alert("browser error");
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/roles/delete/${roleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      alert(responseData.message);

      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Response was not ok");
      }

      navigate("/admin/roles/all")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ maxWidth: "90vw", margin: "auto", padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography
          variant="h3"
          gutterBottom
          color={theme.palette.text.primary}>
          Edit Role
        </Typography>
        <Box sx={{ display: "flex", gap: "1vw" }}>
          <TextField
            id="input-with-icon-textfield"
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
            variant="standard"
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
        />

        <Box sx={{ display: "flex", gap: "5vw" }}>
          <Box
            mb={2}
            sx={{ width: "42vw" }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={theme.palette.text.primary}>
              Admin Controls:
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              p={2}>
              {formData.controlsSet1.map((item, key) => (
                <Chip
                  key={key}
                  label={item.name}
                  onDelete={() => handleControlRemove(item, "controlsSet1")}
                />
              ))}
            </Box>
            <Divider
              sx={{ bgcolor: theme.palette.text.primary, marginBottom: "20px" }}
            />
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              mt={1}>
              {filteredControlSet1
                .filter(
                  (item) =>
                    !formData.controlsSet1.find(
                      (control) => control.name === item.name
                    )
                )
                .map((item, key) => (
                  <Chip
                    key={key}
                    label={item.name}
                    clickable
                    onClick={() => handleControlSelect(item, "controlsSet1")}
                  />
                ))}
            </Box>
          </Box>

          <Box
            mb={2}
            sx={{ width: "42vw" }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={theme.palette.text.primary}>
              Agent Controls:
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              p={2}>
              {formData.controlsSet2.map((item, key) => (
                <Chip
                  key={key}
                  label={item.name}
                  onDelete={() => handleControlRemove(item, "controlsSet2")}
                />
              ))}
            </Box>
            <Divider
              sx={{ bgcolor: theme.palette.text.primary, marginBottom: "20px" }}
            />
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              mt={1}>
              {filteredControlSet2
                .filter(
                  (item) =>
                    !formData.controlsSet2.find(
                      (control) => control.name === item.name
                    )
                )
                .map((item, key) => (
                  <Chip
                    key={key}
                    label={item.name}
                    clickable
                    onClick={() => handleControlSelect(item, "controlsSet2")}
                  />
                ))}
            </Box>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="secondary">
          Save Changes
        </Button>
        <Button
          variant="contained"
          onClick={handleDelete}
          color="error" sx={{marginLeft : "1vw"}}>
            Delete Role
        </Button>
      </form>
    </Box>
  );
};



export default EditRole;
