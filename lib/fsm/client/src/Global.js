import { createGlobalStyle } from "styled-components";
// import {normalize} from 'polished'
import { black, white } from "./utils";

// ${normalize()} removed from const GlobalStyle

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
    }

    *, 
    *:before, 
    *:after {
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
        font-size: 62.5%;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 400;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${white};
        color: ${black};
        min-height: 100vh;
    }
`;

export default GlobalStyle;
