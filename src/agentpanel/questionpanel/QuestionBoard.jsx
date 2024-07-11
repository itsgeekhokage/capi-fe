import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { question } from '../../dummydata/question'
import StaticQuestion from './StaticQuestion'
import DynamicQuestion from './DynamicQuestion'
import Static2Question from './Static2Question'
import { useTheme } from '@emotion/react'

const QuestionBoard = () => {
  const theme = useTheme();
  return (
    <Paper sx={{padding : "1.5vw", display : "flex", flexDirection : "column", gap : "1vw"}}>
      <Typography variant='h4'>
        DATA PROCESS
      </Typography>
      <Box sx={{display : "flex", flexWrap : "wrap", gap : "1vw"}}>
        {
          question.map((item,key) => {
            if(item.type == "static"){
              return <StaticQuestion question={item} />
            }
          })
        }
      </Box>
      <Box sx={{display : "flex", flexWrap : "wrap", gap : "1vw"}}>
        {
          question.map((item,key) => {
            if(item.type == "dynamic"){
              return <DynamicQuestion question={item} />
            }
          })
        }
      </Box>
      <Box sx={{display : "flex", flexWrap : "wrap", gap : "1vw"}}>
        {
          question.map((item,key) => {
            if(item.type == "static2"){
              return <Static2Question question={item} />
            }
          })
        }
      </Box>
      <Box sx={{display : "flex", justifyContent : "center"}}>
        <Button variant='contained' sx={{backgroundColor : theme.palette.secondary.blue, color : "white"}}>Submit</Button>
      </Box>
    </Paper>
  )
}

export default QuestionBoard
