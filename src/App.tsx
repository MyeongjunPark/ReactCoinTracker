import React, { useState } from "react";
import styled from "styled-components";
import Router from "./routes/Router";
import {createGlobalStyle} from 'styled-components'
//import {ReactQueryDevtools} from 'react-query/devtools'
import { lightThemes, darkTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import './css/Font.css'
const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing:border-box;
}

body{
  background-color:${props=>props.theme.bgColor};
  color:${props=>props.theme.textColor};
}
a{
  text-decoration: none;
}
`

const ThemeBtn = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    width:60px;
    height:60px;
    background-color:${props=>props.theme.boxColor};
    border-radius:30px;
    text-align:center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    div{
      color:${(props)=>props.theme.textColor}
    }
    &:hover{
      color:${(props)=>props.theme.accentColor}
    }
`

function App() {
  const [themeMode,setThemeMode] = useState('light');
const theme = themeMode === 'light' ? lightThemes:darkTheme;
const toggleTheme=()=>setThemeMode(themeMode==='light'?'dark':'light')

  return (
    <>
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ThemeBtn onClick={toggleTheme}>{  themeMode === 'light' ? 'DARK':'LIGHT'}</ThemeBtn>
    <Router />
    </ThemeProvider>
</>
  );
}

export default App;
