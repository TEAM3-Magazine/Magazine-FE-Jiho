import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e74c3c, #8e44ad);
    border-radius: 50px;
  }
}
body {
  background-color: rgb(165, 243, 252);
}
`;
