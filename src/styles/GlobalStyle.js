import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollColor};
    border-radius: 5px;
  }
}
body {
  background-color:${(props) => props.theme.bgColor};
}

details > summary::-webkit-details-marker {
  display: none;
}

@media (max-width:551px) {
  &::-webkit-scrollbar {
    display: none;
  }
}
`;
