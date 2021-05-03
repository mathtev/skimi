import { createMuiTheme, Theme } from '@material-ui/core/styles';

const createTheme = (): Theme =>
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

export default createTheme;
