/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#e5f2ffa6",
    },
    secondary: {
      main: "#2C74B3",
      blue: "#144272",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#212121",
      secondary: "#595959",
      heading: "#027c85",
    },
  },
});


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#2a2a2a",
    },
    secondary: {
      main: "#2C74B3",
      blue: "#144272",
    },
    background: {
      default: "#4e4e4e",
      paper: "#393939",
    },
    text: {
      primary: "#f3f7fc",
      secondary: "#feffff",
      heading: "#027c85",
    },
  },
});


const Root = () => {
  const isDarkMode = useSelector((state) => state.theme.lightTheme);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Root />
  </Provider>
);
