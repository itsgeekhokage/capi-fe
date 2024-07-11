/** @format */

import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { EditNote} from "@mui/icons-material";
import EditQuestion from "./EditQuestion";
import { useNavigate } from "react-router-dom";

const SelectedQuestionTable = ({ selectedTags }) => {
  const [questions, setQuestions] = useState(selectedTags);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [editPop, setEditPop] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(selectedTags);
  }, [selectedTags]);

  const editHandler = (row) => {
    navigate("/admin/projects/tag/edit", {state : row})
    setSelectedQuestion(row);
    setEditPop(true);
  }

  const columns = [
    { field: "id", headerName: "Sr. No.", width: 150 },
    { field: "tag", headerName: "Tag Name", width: 150 },
    { field: "placeholder", headerName: "Placeholder Text", width: 450 },
    { field: "desposition_type", headerName: "Desposition Type", width: 150 },
    { field: "is_active", headerName: " Is Active", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => <Box><Button color="secondary" onClick={()=>editHandler(params.row)}> <EditNote/> </Button> <Button color="secondary">  </Button> </Box>,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h4"
        style={{ color: theme.palette.text.primary, margin: "1vw" }}>
        {" "}
        Questions{" "}
      </Typography>
      {questions.length ? (
        <Box sx={{ bgcolor: theme.palette.background.default }}>
          <DataGrid
            rows={questions}
            columns={columns}
            pageSize={5}
            sx={{padding : "0"}}
            getRowId={(row) => row.tag}
          />
        </Box>
       ) : "No questions are added yet..."
      }
      <EditQuestion question={selectedQuestion} open={editPop} setOpen={setEditPop} />
    </Box>
  );
};

export default SelectedQuestionTable;
