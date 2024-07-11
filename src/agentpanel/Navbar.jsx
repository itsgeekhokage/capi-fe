/** @format */

import React, { useEffect, useState } from "react";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../redux/themeslice.jsx";
import {
  Brightness1,
  Brightness2,
  Brightness3,
  Brightness4,
  ExitToApp,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(()=>{
    if(location.pathname === "/agent/home") setSelectedOption("question");
    else setSelectedOption("process");
  }, [location])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height : "60px",
        backgroundColor: theme.palette.secondary.main,
      }}>
      <Tabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
            marginRight: "20px",
          },
          "& .MuiTab-textColorPrimary.Mui-selected": {
            color: theme.palette.text.primary,
          },
          "& .MuiTabs-indicator": {
            height: "4px",
            borderRadius: "2px",
          },
        }}>
        <Tab
          label="Question"
          value="question"
          sx={{ width: "30vw"}}></Tab>
        <Tab
          label="Process"
          value="process"
          sx={{ width: "30vw" }}></Tab>
      </Tabs>
      <Box>
        <IconButton onClick={() => dispatch(toggleTheme())}>
          {" "}
          <Brightness4 />
        </IconButton>
        <IconButton>
          <ExitToApp />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
