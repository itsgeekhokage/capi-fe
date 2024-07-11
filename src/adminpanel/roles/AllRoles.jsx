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

const AllRoles = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST_API}/roles/get/all`);
      if(!response.ok){
        throw new Error("skdljflsd");
      }
      const data = await response.json();
      console.log(data)
      if(data.data) setRoles(data.data);
    } catch (error) {
      console.log(error);
    }
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
