import Router from "./router/Router";
import { GlobalStyle } from "./Styles/GlobalStyle";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
