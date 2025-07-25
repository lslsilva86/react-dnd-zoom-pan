import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Ensure drag overlay is not affected by canvas transforms */
  [data-dnd-context] {
    position: relative;
    z-index: 1001;
  }

  /* Resize handles styling for react-resizable if used */
  .react-resizable-handle {
    background-color: #007acc !important;
    border: 1px solid white !important;
  }

  .react-resizable-handle-se {
    background-color: #007acc !important;
  }
`;
