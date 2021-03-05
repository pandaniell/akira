import { createGlobalStyle } from "styled-components"

import { BASE_FONT_SIZE, fontFamily } from "./design/typography"

export const GlobalStyles = createGlobalStyle`
    html,*, *::before, *::after{
        font-family : ${fontFamily.body};
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
        scroll-behavior:smooth;
        
    }
    body{
        margin:0;
        font-size: ${BASE_FONT_SIZE};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #090312;
        color: #fff;
    }`
