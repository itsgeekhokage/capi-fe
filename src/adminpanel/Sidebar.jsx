/** @format */

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  ListItemButton,
} from "@mui/material";
import {
  AccountCircle,
  Brightness4,
  ExitToApp,
  Menu as MenuIcon,
  Group,
  Domain,
  AccountTree,
  ReportOutlined,
  RollerShades,
  Tag,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeslice.jsx";
import { useTheme } from "@emotion/react";

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 300,
    boxSizing: "border-box",
  },
}));

const Logo = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const BottomOptions = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(2),
}));

const Sidebar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const themeSel = useSelector((state) => state.theme.lightTheme);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const sections = [
    { name: "Agents", icon: <Group />, link: "/admin/agents/all" },
    { name: "Projects", icon: <Domain />, link: "/admin/projects/all" },
    { name: "Report", icon: <ReportOutlined />, link: "/admin/report" },
  ];

  const bottomSections = [
    { name: "Roles", icon: <AccountTree />, link: "/admin/roles/all" },
    { name: "Tags", icon: <Tag />, link: "/admin/tags/all" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ width: "5vw", maxHeight: "100vh" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu">
            <MenuIcon
              style={{ width: 50 }}
              onClick={() => setOpenDrawer(true)}
            />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}></Typography>
        </Toolbar>
        <Box>
          {sections.map((section, index) => (
            <Link
              to={section.link}
              style={{
                color: theme.palette.text.heading,
                textDecoration: "none",
              }}
              key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                }}>
                {section.icon}
              </Box>
            </Link>
          ))}
        </Box>
        <BottomOptions>
          <Divider />
          <List>
            <ListItemButton
              sx={{ display: "flex", justifyContent: "center" }}
              onClick={() => navigate("/admin/roles/all")}>
              <AccountTree />
            </ListItemButton>
            <ListItemButton
              sx={{ display: "flex", justifyContent: "center" }}
              onClick={() => navigate("/admin/tags/all")}>
              <Tag />
            </ListItemButton>
            <ListItemButton
              onClick={handleThemeToggle}
              sx={{ display: "flex", justifyContent: "center" }}>
              <Brightness4 />
            </ListItemButton>
            <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
              <ExitToApp />
            </ListItemButton>
          </List>
        </BottomOptions>
      </AppBar>

      <DrawerStyled
        variant="temporary"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}>
        <Logo>
          <Avatar
            alt="Logo"
            src="/path/to/logo.png"
          />
        </Logo>
        <Divider />
        <List>
          {sections.map((section, index) => (
            <Link
              to={section.link}
              style={{
                background: theme.palette.background.default,
                color: theme.palette.text.heading,
                textDecoration: "none",
              }}
              key={index}>
              <ListItem button>
                <ListItemIcon>{section.icon}</ListItemIcon>
                <ListItemText primary={section.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <BottomOptions>
          <Divider />
          <List>
            <ListItemButton onClick={() => navigate("/admin/roles/all")}>
              <ListItemIcon>
                <AccountTree />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/admin/tags/all")}>
              <ListItemIcon>
                <Tag />
              </ListItemIcon>
              <ListItemText primary="Tags" />
            </ListItemButton>
            <ListItemButton onClick={handleThemeToggle}>
              <ListItemIcon>
                <Brightness4 />
              </ListItemIcon>
              <ListItemText primary="Theme" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </BottomOptions>
      </DrawerStyled>
    </>
  );
};

export default Sidebar;
