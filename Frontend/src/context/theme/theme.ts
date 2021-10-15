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
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: '0.6em',
            height: '0.6em',
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px #bdbdbda6',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '0px solid slategrey',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#b9b9b9'
            }
          }
        }
      },
    },
    palette: {
      primary: {
        main: '#222222',
      },
      secondary: {
        main: '#222222',
      },
    },
  });
  
  export const cssVariables = {
    sidebarWidth: 250,
    headerHeight: 64,
  };
