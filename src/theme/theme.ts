import { createMuiTheme, Theme } from '@material-ui/core/styles';

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
    sidebarOpenWidth: 240,
    sidebarCloseWidth: 60,
    headerHeight: 64
  };
