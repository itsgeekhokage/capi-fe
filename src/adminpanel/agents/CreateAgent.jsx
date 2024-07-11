/** @format */

import React, { useState } from "react";
import { Box, Paper, Tabs, Tab } from "@mui/material";
import CreateAgentsByExcel from "./CreateAgentsByExcel";
import CreateAgentsManually from "./CreateAgentsManually";
import { useTheme } from "@emotion/react";

const CreateAgent = () => {
  const [selectedOption, setSelectedOption] = useState("excel");
  const theme = useTheme();

  const handleOptionChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  return (
    <Box
      p={2}
      sx={{ bgcolor: theme.palette.background.default }}>
      <Paper
        elevation={4}
        sx={{
          width: 500,
          flexShrink: 0,
          backgroundColor: theme.palette.secondary.main,
        }}>
        <Tabs
          value={selectedOption}
          onChange={handleOptionChange}
          centered
          textColor="primary"
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
            label="Create Agents By Excel"
            value="excel"
          />
          <Tab
            label="Create Agents Manually"
            value="manual"
          />
        </Tabs>
      </Paper>
      <Box
        flex={1}
        p={2}>
        {selectedOption === "excel" ? (
          <CreateAgentsByExcel />
        ) : (
          <CreateAgentsManually />
        )}
      </Box>
    </Box>
  );
};

export default CreateAgent;
