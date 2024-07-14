/** @format */

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
} from "@mui/material";
import RoleCard from "./RoleCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { fetchAllRoles } from "../../apis/adminpanel/roles";

const AllRoles = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    const data = await fetchAllRoles();
    setRoles(data);
  }

  useEffect(()=>{
    fetchRoles();
  }, []);
  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1vw",
          margin: "1vw",
        }}>
        <Typography variant="h5">DashBoard : Roles</Typography>
        <Button
          variant="conatined"
          sx={{
            color: theme.palette.background.default,
            backgroundColor: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
          onClick={() => navigate("/admin/roles/create")}>
          Make New Roles
        </Button>
      </Paper>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        {roles.map((item, key) => (
          <RoleCard
            key={key}
            item={item}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllRoles;
