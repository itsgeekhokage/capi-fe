/** @format */

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const DataList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box>
      <Typography m={2}>DATALIST FOR [AGENT NAME]</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Survey Id</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>gkd32894fiefjjkj9483948</TableCell>
              <TableCell><Button onClick={()=>navigate("/agent/question")} variant="contained" sx={{backgroundColor : theme.palette.secondary.main, color : "white"}}>Process</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataList;
