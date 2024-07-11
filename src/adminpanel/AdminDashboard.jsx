/** @format */


import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AdminDashboard = () => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex", minHeight : "100vh", backgroundColor : theme.palette.background.paper}}  >
      <Sidebar />
      <Box sx={{flex: 1, padding : "2vw"}}>
        <Outlet />
      </Box>
    </div>
  );
};

export default AdminDashboard;
