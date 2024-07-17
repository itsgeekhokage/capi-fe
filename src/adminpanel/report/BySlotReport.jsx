/** @format */

import {
  Box,
  Button,
  FormControl,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const BySlotReport = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleFormUpdate = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    { field: "projectCode", headerName: "Project Code", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "slotTime", headerName: "Slot Time", width: 150 },
    {
      field: "sampleReceivedCount",
      headerName: "Sample Received Count",
      width: 180,
    },
    {
      field: "sampleAuditedCount",
      headerName: "Sample Audited Count",
      width: 180,
    },
  ];

  return (
    <Box
      sx={{ padding: 3, maxWidth: "95vw", margin: "auto" }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          paddingBottom: 4,
          paddingTop: 4
        }}>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="Date"
            size="small"
            type="date"
            value={formData.date}
            onChange={(e) => handleFormUpdate("date", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="Start Time"
            size="small"
            type="time"
            value={formData.startTime}
            onChange={(e) => handleFormUpdate("startTime", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="End Time"
            size="small"
            type="time"
            value={formData.endTime}
            onChange={(e) => handleFormUpdate("endTime", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="info">
          Generate Report
        </Button>
      </Box>
      <Box sx={{ width: "100%", height: 400 }}>
        <DataGrid
          rows={[]}
          columns={columns}
          pageSize={5}
          autoHeight
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default BySlotReport;
