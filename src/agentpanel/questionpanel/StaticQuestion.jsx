import { useTheme } from '@emotion/react'
import { Box, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const StaticQuestion = ({question}) => {
  console.log("static")
  const theme = useTheme();
  return (
    <Box sx={{display : "flex", flexDirection : "column", gap : "0.5vw", padding : "1vw", backgroundColor : theme.palette.background.default, width : "23vw"}}>
      <Typography>{question.id}. {question.tag}</Typography>
      <Typography>{question.placeholder} </Typography>
      <TextField value={"answer"}>Answer</TextField>
    </Box>
  )
}

export default StaticQuestion
