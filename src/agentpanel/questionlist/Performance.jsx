import { useTheme } from '@emotion/react';
import { Box, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Performance = () => {
  const theme = useTheme();
  return (
    <Paper sx={{ padding: "1vw" }}>
      <Typography
        variant="h4"
        m={2}>
        Performance
      </Typography>
      <Box>
        <TextField
          id="date"
          label="Select Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.text.primary,
            },
          }}
          variant="outlined"
        />
      </Box>
    </Paper>
  );
}

export default Performance
