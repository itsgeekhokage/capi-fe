/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { fetchProjects } from "../../apis/adminpanel/projects";

export default function AllProjects() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "project_name", headerName: "Project Name", width: 150 },
    { field: "project_code", headerName: "Project Code", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "deadline", headerName: "Deadline", width: 150 },
    { field: "files", headerName: "Files", width: 150 },
    {
      field: "project_tags",
      headerName: "Project Tags",
      width: 150,
      renderCell: (params) => (
        params.row.project_tags.length
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          color="secondary"
          onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (row) => {
    navigate("/admin/projects/edit", { state: row });
  };



  useEffect(() => {
    const fetch = async () => {
      const data = await fetchProjects();
      setRows(data);
    }

    fetch();

  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2vw" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography
          variant="h2"
          style={{ color: theme.palette.text.primary }}>
          Projects
        </Typography>
        <Button
          sx={{
            padding: "0.5vw 1vw",
            backgroundColor: theme.palette.text.primary,
            "&:hover": { color: theme.palette.text.primary },
          }}
          onClick={() => navigate("/admin/projects/create")}>
          Create New Project
        </Button>
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
