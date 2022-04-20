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
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme !== "2" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
