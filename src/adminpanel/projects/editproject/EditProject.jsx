/** @format */

import { Box, Button, InputLabel, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AllQuestions from "../questions/AllQuestions";
import { questions } from "../../../dummydata/questions.js";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import EditBasicProjectDetails from "./EditBasicProjectDetails";
import TagsModal from "./TagsModal";
import SelectedQuestionTable from "./SelectedQuestionTable";

const EditProject = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const [project, setProject] = useState(null);
  const [openTags, setOpenTags] = useState(false);
  const [tags, setTags] = useState([]);
  const [openManual, setOpenManual] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/questiontags/get/all`
      );
      if (!response.ok) {
        alert("internal server error");
        throw new Error("reponse was not okk");
      }
      const data = await response.json();
      setTags(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(location.state);
    const projectId = location.state.id;
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/projects/get/${projectId}`
        );
        if (!response.ok) {
          alert("internal server error");
          throw new Error("reponse was not okk");
        }
        const data = await response.json();
        setProject(data.data);
        setSelectedTags(data.data.project_tags)
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"1vw"}>
      <EditBasicProjectDetails project={project} />
      <Paper
        sx={{
          padding: "1vw",
          backgroundColor: theme.palette.background.default,
        }}>
        <Box>
          <Box sx={{ display: "flex", gap: "1vw" }}>
            <Button
              variant="contained"
              color="info"
              onClick={() => setOpenTags(true)}>
              Import tags : server
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => setOpenTags(true)}>
              Import tags : local
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() =>
                navigate("/admin/projects/tag/create", {
                  state: { id: project.id, project_code: project.project_code },
                })
              }>
              Add Manual
            </Button>
          </Box>
          <Box>
            <AllQuestions
              questions={questions}
              open={false}
            />
          </Box>
        </Box>
        <Box>
          <SelectedQuestionTable selectedTags={selectedTags} />
        </Box>
      </Paper>
      <Box>
        <TagsModal
          tags={tags}
          open={openTags}
          setOpen={setOpenTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Box>
    </Box>
  );
};

export default EditProject;
