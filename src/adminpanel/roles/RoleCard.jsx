/** @format */
import React from 'react'
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const RoleCard = ({ item }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
        sx={{
            bgcolor: theme.palette.background.default,
            p: 2,
        borderRadius: 1,
        boxShadow: 1,
        minWidth: 300,
        cursor: "pointer",
        transition: "box-shadow 0.3s",
        color: theme.palette.text.primary,
        "&:hover": {
            boxShadow: 3,
        },
    }}
    onClick={() => navigate("/admin/roles/edit", {state : item})}>
      <Typography
        variant="h6"
        gutterBottom>
        {item.name}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="subtitle3"
          gutterBottom>
          Controls: {item.access_controls.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default RoleCard