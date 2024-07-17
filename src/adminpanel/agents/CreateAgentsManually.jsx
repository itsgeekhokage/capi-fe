/** @format */

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { fetchProjects } from "../../apis/adminpanel/projects";
import { fetchAllRoles } from "../../apis/adminpanel/roles";
import { createAgentManual } from "../../apis/adminpanel/users";
import { createVendor, fetchAllVendors } from "../../apis/adminpanel/vendor";

const CreateAgentsManually = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [project, setProject] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [vendor, setVendor] = useState("");
  const [otherVendor, setOtherVendor] = useState("");
  const [role, setRole] = useState({});
  const [roleList, setRoleList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  const theme = useTheme();

  const saveNewVendor = async () => {
    await createVendor(otherVendor);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(vendor == "other"){
      saveNewVendor();
    }
    const payload = {
      name: username,
      user_id: userId,
      password,
      project_id: project.id,
      role_id: role.id,
      vendor: vendor=="other" ? otherVendor : vendor,
      updated_by: "1",
    };
    await createAgentManual(payload);
  };

  const fetchAllProjects = async () => {
    const result =  await fetchProjects();
    setProjectList(result);
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
    fetchAllProjects();
    fetchRoles();
    fetchVendors();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.text.primary,
          },
        }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.text.primary,
          },
        }}
      />
      <FormControl fullWidth>
        <InputLabel
          htmlFor="vendor"
          fullWidth>
          {" "}
          Vendor{" "}
        </InputLabel>
        <Select
          id="vendor"
          fullWidth
          value={vendor}
          label="vendor"
          onChange={(e) => setVendor(e.target.value)}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
          }}>
          {vendorList.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
      {vendor == "other" && (
        <TextField
          fullWidth
          placeholder="please specify"
          value={otherVendor}
          onChange={(e) => setOtherVendor(e.target.value)}>
        </TextField>
      )}
      <FormControl fullWidth>
        <InputLabel
          htmlFor="project"
          fullWidth>
          {" "}
          Project{" "}
        </InputLabel>
        <Select
          id="project"
          fullWidth
          value={project}
          label="project"
          onChange={(e) => setProject(e.target.value)}>
          {projectList.map((item) => (
            <MenuItem value={item}>{item.project_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel
          htmlFor="roles"
          fullWidth>
          {" "}
          Roles{" "}
        </InputLabel>
        <Select
          id="roles"
          fullWidth
          value={role}
          label="roles"
          onChange={(e) => setRole(e.target.value)}>
          {roleList.map((item) => (
            <MenuItem value={item}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="success"
        fullWidth>
        Create Agent
      </Button>
    </Box>
  );
};

export default CreateAgentsManually;
