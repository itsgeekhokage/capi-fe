/** @format */

import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const ByAgentReport = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    user_id: "",
    project_code: "",
  });

  const handleFormUpdate = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    { field: "projectCode", headerName: "Project Code", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "agentCode", headerName: "Agent Code", width: 150 },
    { field: "loginTime", headerName: "Login Time", width: 150 },
    { field: "logoutTime", headerName: "Logout Time", width: 150 },
    { field: "samplesAssigned", headerName: "Samples Assigned", width: 180 },
    { field: "samplesAudited", headerName: "Samples Audited", width: 180 },
    { field: "audibleCount", headerName: "Audible Count", width: 150 },
    { field: "notAudibleCount", headerName: "Not Audible Count", width: 180 },
    { field: "averageAuditTime", headerName: "Average Audit Time", width: 180 },
  ];

  return (
    <Box
      elevation={3}
      sx={{ padding: 3, maxWidth: "90vw", margin: "2vw 0" }}>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          paddingBottom: 4,
        }}>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="Start Date"
            size="small"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleFormUpdate("startDate", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="End Date"
            size="small"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleFormUpdate("endDate", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="Agent ID"
            size="small"
            type="text"
            value={formData.user_id}
            onChange={(e) => handleFormUpdate("user_id", e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="Project Code"
            size="small"
            type="text"
            value={formData.project_code}
            onChange={(e) => handleFormUpdate("project_code", e.target.value)}
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

export default ByAgentReport;
