import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    background: #fff;
    margin: 0;
  }

  section, article {
    width: 80%;
    margin: auto;
  }

  a:hover {
    color: #651fff;
  }
`

export default GlobalStyles
