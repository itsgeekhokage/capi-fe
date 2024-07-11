import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AgentDashboard = () => {
  return (
    <Box sx={{height : "100vh"}}>
      <Navbar/>
      <Outlet/>
    </Box>
  )
}

export default AgentDashboard
