import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // switch to "dark" if you prefer
    background: {
      default: "#f5f5f5",   // page background
      paper: "#ffffff",     // cards/panels background
    },
    text: {
      primary: "#000000",   // default text color
      secondary: "#555555", // lighter text
    },
  },
});


createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
)
