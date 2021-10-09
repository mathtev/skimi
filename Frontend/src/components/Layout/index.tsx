import { makeStyles } from '@material-ui/core';
import React from 'react';
import { cssVariables } from '../../context/theme/theme';
import Header from '../Header';
import Sidebar from '../Sidebar';
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import Home from '../../pages/Home';
import Admin from '../../pages/admin';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
  },
  content: {
    paddingTop: `calc(${cssVariables.headerHeight + theme.spacing(6)}px)`,
  },
}));

const Layout = () => {
  const classes = useStyles();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={classes.root}>
      <Router>
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className={classes.content}>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            <Route path="/home" exact component={Home} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default Layout;
