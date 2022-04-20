import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e74c3c, #8e44ad);
    border-radius: 5px;
  }
}
body {
  background-color:${(props) => props.theme.bgColor};
}

details > summary::-webkit-details-marker {
  display: none;
}
`;
