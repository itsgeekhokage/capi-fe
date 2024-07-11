import { Box, Paper } from '@mui/material'
import React from 'react'
import DataList from './DataList'
import Performance from './Performance'
import { useTheme } from '@emotion/react'

const QuestionList = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        gap: "1vw",
      }}>
      <Box sx={{ width: "46vw", padding: "1vw" }}>
        <DataList />
      </Box>
      <Box sx={{ width: "46vw", padding: "1vw" }}>
        <Performance />
      </Box>
    </Paper>
  );
}

export default QuestionList
