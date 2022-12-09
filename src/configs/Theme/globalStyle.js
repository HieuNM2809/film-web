import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  @import url(//fonts.googleapis.com/css?family=Open+Sans);

  body {
    margin:0px;
    box-sizing:border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #E5E5E5;
  }
  .MuiMenu-paper {
    margin-top: 8px;
  }
  .MuiIcon-root{
    font-size: 1.2rem!important;
  }
  .center{
    display:flex;
    justify-content:center;
    align-items:center
  }
  .PersistentDrawerLeft-content-3{
    overflow:unset!important;
  }
`;
export default GlobalStyle;
