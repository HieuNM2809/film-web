import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,

      tablet: 640,
      laptop: 1024,
      desktop: 1280
    }
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 800
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 800
    },
    h3: {
      color: 'rgb(23,23,23)',
      lineHeight: 1.25,
      fontSize: '1.875rem',
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
      marginBottom: '0.25rem',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '15px',
      fontWeight: 400
    },
    h5: {
      fontSize: '12px',
      fontWeight: 600
    },
    button: {
      fontSize: '16px',
      fontWeight: 600
    },
    button2: {
      fontSize: '13px',
      lineHeight: '18px',
      fontWeight: 600
    },
    caption: {
      fontSize: '12px'
    },
    subtitle1: {
      fontSize: '11px',
      lineHeight: '22px'
    },
    subtitle2: {
      fontSize: '12px'
    },
    body1: {
      fontSize: '15px'
    },
    body2: {
      fontSize: '17px'
    },
    overline: {
      fontSize: '20px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    smallText: {
      fontWeight: 500,
      fontSize: '11px',
      lineHeight: '13px'
    }
  },
  overrides: {
    MuiButton: {
      containedSecondary: {
        color: 'white'
      }
    }
  },
  headerHeight: '56px',
  color: {
    primary: {
      main: 'rgb(59, 73, 223)',
      lighter: 'rgb(80, 99, 301)',
      darker: 'rgb(47, 58, 178)',
    },
    linkColor: '#404040',
    iconColor: '#3D3D3D',
    strongText: '#303030',
    alert: '#FD2446',
    green1: '#219653',
    blue1: '#2F80ED',
    confirm: '#00C48C',
    base: '#090909',
    base90: '#242424',
    base80: '#3d3d3d',
    base70: '#575757',
    base60: '#717171',
    base50: '#8a8a8a',
    base40: '#a3a3a3',
    base30: '#bdbdbd',
    base20: '#d6d6d7',
    base10: '#efefef',
    base0: '#f9f9f9',
  },
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.07)',
  boxShadow2: '0px 0px 10px rgba(0,0,0,0.16)',
  boxShadow3: '0px 0px 10px rgba(0,0,0,0.1)',
  boxShadow4: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '6px',
  palette: {
    primary: {
      main: '#542679',
      light: '#987DAF',
      lighter: '#E6DAF0'
    },
    secondary: {
      main: '#EEBA00',
      light: '#F5D666',
      lighter: '#FBEEBF'
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
