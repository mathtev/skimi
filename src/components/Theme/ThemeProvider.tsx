import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { createContext, useState } from 'react';
import {createTheme, cssVariables} from '../../theme/theme';

interface MyThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  defaultDark: boolean;
}

export const ThemeContext = createContext<MyThemeContext>({
  isDark: false,
  toggleTheme: () => undefined,
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultDark,
  children,
}) => {
  const [isDark, setDark] = useState(defaultDark);

  const toggleTheme = () => {
    setDark(!isDark);
    localStorage.setItem('theme', (!isDark).toString());
  };

  const theme = createTheme();

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MuiThemeProvider theme={{...theme, ...cssVariables}}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.defaultProps = {
  defaultDark: false,
};


export default ThemeProvider;