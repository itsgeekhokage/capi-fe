/** @format */

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Switch, Button, Container, Box, Typography, Paper } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const AllTags = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/questiontags/get/all`
        );
        const data = await response.json();
        setRows(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSwitchChange = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, default: !row.default } : row
      )
    );
  };

  const handleEditClick = (row) => {
    navigate("/admin/tags/edit", {state : row})
    console.log("Edit row:", id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "placeholder", headerName: "Placeholder", width: 150 },
    { field: "tag", headerName: "Tag", width: 150 },
    { field: "desposition_type", headerName: "Desposition Type", width: 150 },
    { field: "desposition", headerName: "Desposition", width: 150 },
    {
      field: "default",
      headerName: "Default",
      width: 150,
      renderCell: (params) => (
        <Switch
          color="success"
          checked={params.value}
          onChange={() => handleSwitchChange(params.row)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          color="success"
          onClick={() => handleEditClick(params.row)}>
          <Edit/>
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          width : "100%"
        }}>
        <Typography variant="h3">All Tags</Typography>{" "}
        <Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/admin/tags/create")}>
          Import Tags
        </Button>{" "}
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/admin/tags/create")}>
          Create New
        </Button>{" "}

            </Box>
      </Box>
      <Paper style={{ height: 400, width: "100%", backgroundColor : theme.palette.background.default}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </Paper>

    </Container>
  );
};

export default AllTags;
