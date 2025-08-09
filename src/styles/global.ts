import { createGlobalStyle } from "styled-components";
import "primeicons/primeicons.css";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Manrope", serif;
  }

  img {
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;

export const FlexAlignCenterJustifyBetween = `
  	display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FlexAlignCenterJustifyCenter = `
  	display: flex;
    justify-content: center;
    align-items: center;
`;
