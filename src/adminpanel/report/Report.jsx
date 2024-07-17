/** @format */

import { Box, Menu, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import ByAgentReport from "./ByAgentReport";
import BySlotReport from "./BySlotReport";

const Report = () => {
  const [slotType, setSlotType] = useState("slot");
  return (
    <div>
      <Box sx={{display : "flex", justifyContent : "space-between"}}>
        <Typography variant="h3">Report</Typography>
        <Select
          value={slotType}
          label={"Slot Type"}
          onChange={(e) => setSlotType(e.target.value)}>
          <MenuItem value="agent">Agent Report</MenuItem>
          <MenuItem value="slot">Slot Report</MenuItem>
        </Select>
      </Box>
      {
        slotType == "agent" && <ByAgentReport/>
      }
      {
        slotType == "slot" && <BySlotReport/>
      }
    </div>
  );
};

export default Report;
