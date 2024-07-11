/** @format */

import React, { useState } from "react";
import Papa from "papaparse";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Input,
} from "@mui/material";
import { useTheme } from "@emotion/react";


const CreateAgentsByExcel = () => {
  const [jsonData, setJsonData] = useState(null);
  const theme = useTheme();

  const verifyData = async (data) => {
    const headers = Object.keys(data[0]);
    const sampleHeaders = ["name", "user_id", "password", "role", "vendor"];

    function arraysContainSameElements(arr1, arr2) {
      return (
        arr1.length === arr2.length && arr1.every((item) => arr2.includes(item))
      );
    }

    if (!arraysContainSameElements(headers, sampleHeaders)) {
      alert("Wrong table headers!");
      return false;
    }

    const nullFound = data.some((item) => {
      return Object.values(item).some((value) => value === "");
    });

    if (nullFound) {
      alert("Bad request! Null value detected.");
      return false;
    }

    const roleList = [...new Set(data.map((item) => item.role))];
    const roleVerified = await checkRole(roleList);
    if (!roleVerified) return false;

    return true;
  };

  const checkRole = async (rolelist) => {
    const payload = rolelist;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/roles/verify/roles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      alert(result.message);

      if (!response.ok) {
        throw new Error("Response was not OK");
      }

      return result.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    Papa.parse(uploadedFile, {
      header: true,
      complete: async (result) => {
        result.data.pop();
        const dataIsValid = await verifyData(result.data);
        if (dataIsValid) {
          setJsonData(result.data);
        } else {
          alert("Data is not valid, please check.");
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  const handleSubmit = async () => {
    const payload = { users: jsonData, updated_by: "1" };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/user/create/excel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      alert(result.message);

      if (!response.ok) {
        throw new Error("Response was not OK");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={2}>
      <Input
        type="file"
        onChange={handleFileUpload}
      />
      {jsonData && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: theme.palette.text.primary,
              color: theme.palette.background.default,
            }}
            onClick={handleSubmit}>
            Upload Data
          </Button>
          <TableContainer
            component={Paper}
            sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(jsonData[0]).map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        backgroundColor: theme.palette.text.primary,
                        color: theme.palette.background.default,
                      }}>
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell key={idx}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default CreateAgentsByExcel;
