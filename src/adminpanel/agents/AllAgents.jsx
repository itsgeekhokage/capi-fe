/** @format */

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { fetchAllAgents } from "../../apis/adminpanel/users";

export default function AllAgents() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const columns = [
  { field: "user_id", headerName: "User ID", width: 200 },
  { field: "name", headerName: "Agent name", width: 200 },
  { field: "password", headerName: "Password", width: 150 },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    valueGetter: (value,row) => row?.role ? row.role.name : ''
  },
  { field: "is_active", headerName: "Is Active", width: 150 },
  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (params) => (
      <Button color="secondary" onClick={() => handleEdit(params.row)}>
        Edit
      </Button>
    ),
  },
];


  const theme = useTheme();

  const handleEdit = (row) => {
    navigate("/admin/agents/edit", { state: row });
  };

  const fetchAgents = async () => {
    const result = await fetchAllAgents();
    setRows(result);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2vw" }}>
      <Box sx={{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
        <Typography
          variant="h2"
          style={{ color: theme.palette.text.primary }}>
          {" "}
          Agents{" "}
        </Typography>
        <Button variant="contained" onClick={()=>navigate("/admin/agents/create")}>Create Agents</Button>
      </Box>
      <Box sx={{ bgcolor: theme.palette.background.default }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </Box>
    </Box>
  );
}
