/** @format */

import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const AllQuestions = ({ questions, open }) => {
  const theme = useTheme();

  const handleAdd = () => {
    console.log("sdflk");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        padding: "50px",
        display: open ? "flex" : "none",
        backgroundColor : "#00000069"
      }} >
      <Paper
        sx={{
          backgroundColor: theme.palette.background.default,
          flexDirection: "column",
          gap: "2vw",
          height : "80vh",
          width : "90vw",
          padding : "1vw"
        }}>
        <Typography
          variant="h5"
          gutterBottom>
          All Questions
        </Typography>
        <TableContainer sx={{ height: "70vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Answers</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.id}</TableCell>
                  <TableCell>{question.question}</TableCell>
                  <TableCell>{question.answers?.length}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => handleAdd(question)}>
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AllQuestions;
