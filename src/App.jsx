import Router from "./router/Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/Theme";
import { useRecoilValue } from "recoil";
import { themeState } from "./recoil/atoms";
import { ThemeProvider } from "styled-components";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";

function App() {
  const theme = useRecoilValue(themeState);
  return (
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme !== "2" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
