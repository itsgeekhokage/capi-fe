/** @format */

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createVendor, fetchAllVendors } from "../../apis/adminpanel/vendor";
import { updateAgents } from "../../apis/adminpanel/users";
import { fetchAllRoles } from "../../apis/adminpanel/roles";

const EditAgent = () => {
  const location = useLocation();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    password: "",
    role: "",
    vendor: "",
    is_active: false,
    org_id: "",
  });

  const [roles, setRoles] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [otherVendor, setOtherVendor] = useState("");

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);

  const changeFormData = (name, value) => {
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (event) => {
    changeFormData("is_active", event.target.checked);
  };

   const saveNewVendor = async () => {
    await createVendor(otherVendor);
   };

  const submitHandler = async (e) => {
    e.preventDefault();
    const id = location.state?.id;
    if (!id) {
      alert("ID is not defined");
      return;
    }
    console.log(formData);
    if (formData.vendor == "other") {
      saveNewVendor();
    }
    const payload = { ...formData, role_id: formData.role, updated_by: "1", vendor : formData.vendor == "other" ? otherVendor : formData.vendor };

    await updateAgents(id, payload);

    console.log(payload);

  };

  const fetchRoles = async () => {
    const result = await fetchAllRoles();
    setRoleList(result);
  };

  const fetchVendors = async () => {
   const result = await fetchAllVendors();
   if (result) setVendorList(result);
  };

  useEffect(() => {
    fetchRoles();
    fetchVendors();
  }, []);

  return (
    <Paper
      bgcolor={theme.palette.background.default}
      sx={{ padding: "2vw" }}>
      <Typography
        variant="h3"
        color={theme.palette.text.primary}>
        Edit Agent
      </Typography>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            gap: "1rem",
          }}>
          <Typography variant="body1">Is Active:</Typography>
          <Switch
            checked={formData.is_active}
            onChange={handleSwitchChange}
            color="info"
            inputProps={{ "aria-label": "is active checkbox" }}
            sx={{ marginLeft: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Agent Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => changeFormData("name", e.target.value)}
            required
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          />
          <TextField
            label="User Id"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.user_id}
            onChange={(e) => changeFormData("user_id", e.target.value)}
            required
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={formData.password}
            onChange={(e) => changeFormData("password", e.target.value)}
            required
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              label="Role"
              variant="outlined"
              id="role"
              fullWidth
              margin="normal"
              value={formData.role || ""}
              onChange={(e) => changeFormData("role", e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roles.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="vendor">Vendor</InputLabel>
            <Select
              id="vendor"
              fullWidth
              value={formData.vendor}
              label="Vendor"
              onChange={(e) => changeFormData("vendor", e.target.value)}
              sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.text.primary,
                },
              }}>
              {vendorList.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
          {formData.vendor === "other" && (
            <TextField
              fullWidth
              placeholder="Please specify"
              value={otherVendor}
              onChange={(e) => setOtherVendor(e.target.value)}
              sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.text.primary,
                },
              }}
            />
          )}
          <TextField
            label="Organization ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.org_id}
            onChange={(e) => changeFormData("org_id", e.target.value)}
            required
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.text.primary,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            onClick={submitHandler}
            sx={{ marginTop: "1rem" }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditAgent;
