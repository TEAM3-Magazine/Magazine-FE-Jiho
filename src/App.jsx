import Router from "./router/Router";
import { GlobalStyle } from "./Shared/GlobalStyle";
import "tailwindcss/tailwind.css";
import { darkTheme, lightTheme } from "./Shared/Theme";
import { useRecoilValue } from "recoil";
import { themeState } from "./recoil/atoms";
import { ThemeProvider } from "styled-components";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

function App() {
  const theme = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={theme !== "2" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
