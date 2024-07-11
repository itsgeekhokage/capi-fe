/** @format */

import React from "react";
import { Container, Typography, TextField, Button, Grid, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="main"
      maxWidth="xs">
      <Paper sx={{ padding: "20px" }}>
        <Typography
          component="h1"
          variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid
            container
            justifyContent="center"
            gap={"1vw"}>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary">
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => navigate("/admin/roles/all")}>
                Admin
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => navigate("/agent/home")}>
                Agent
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
