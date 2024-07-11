/** @format */

import { useTheme } from "@emotion/react";
import { Delete, EditNote,  } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllControls = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const handleDelete = async (row) => {
    const id = row?.id;
     if (!id) {
       alert("ID is not defined");
       return;
     }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/controls/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      alert(responseData.message);

      fetchControls();

      if (!response.ok) {
        alert("Internal server error");
        throw new Error("Response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: "100" },
    { field: "name", headerName: "name", width: "250" },
    { field: "path", headerName: "Path", width: "350" },
    { field: "updated_by", headerName: "Updated By", width: "250" },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            color="secondary"
            onClick={() => navigate("/admin/controls/edit", {state : params.row})}>
            <EditNote/>
          </Button>
          <Button color="secondary" onClick={()=> handleDelete(params.row)}> <Delete/> </Button>
        </>
      ),
    },
  ];

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
      setRows(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchControls();
  }, []);

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1vw",
          margin: "1vw 0",
        }}>
        <Typography>Dashboard : Access Controls</Typography>
        <Button
          sx={{
            color: theme.palette.background.default,
            backgroundColor: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
          onClick={() => navigate("/admin/controls/create")}>
          Create New Control
        </Button>
      </Paper>
      <DataGrid
        rows={rows}
        columns={columns} getRowId={(row)=>row.id}></DataGrid>
    </Box>
  );
};
export default AllControls;
