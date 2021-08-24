import { createTheme as createMuiTheme, Theme } from '@material-ui/core/styles';

export const createTheme = (): Theme =>
  createMuiTheme({
    overrides: {
      MuiSvgIcon: {
        root: {
          width: 26,
          height: 26,
        },
      },
    },
    palette: {
      // info: {
      //   main: "#caabaa"
      // }
    },
  });
  
  export const cssVariables = {
    sidebarWidth: 250,
    headerHeight: 64,
  };
