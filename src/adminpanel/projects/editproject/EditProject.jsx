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
import { fetchSingleProject } from "../../../apis/adminpanel/projects.js";
import { fetchQuestionTags } from "../../../apis/adminpanel/questionTags.js";

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
    const data = await fetchQuestionTags();
    setTags(data);
  };

  useEffect(() => {
    console.log(location.state);
    const projectId = location.state.id;
    const fetchProject = async () => {
      const data = await fetchSingleProject(projectId);
      setProject(data);
      setSelectedTags(data.project_tags)
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
