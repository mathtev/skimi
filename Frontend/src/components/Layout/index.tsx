import { makeStyles } from '@material-ui/core';
import React from 'react';
import { cssVariables } from '../../context/theme/theme';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Admin from '../../pages/admin';
import { useAuth } from '../../hooks/useAuth';
import Login from '../../pages/Login';
import { PrivateRoute } from '../PrivateRoute';
import Loader from 'react-loader-spinner';
import YourSets from '../../pages/YourSets';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    inset: 0,
  },
  loader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: `calc(${cssVariables.headerHeight + theme.spacing(6)}px)`,
  },
}));

const Layout = () => {
  const classes = useStyles();
  const { currentUser, authLoading, authenticated} = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const pageLoaded = !authLoading;

  return (
    <div className={classes.root}>
      {pageLoaded && authenticated ? (
        <div>
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className={classes.content}>
            <Switch>
              <Route
                path="/home"
                exact
                component={Home}
              />
              <Route
                path="/your-sets"
                component={YourSets}
              />
              <Route
                path="/admin"
                component={Admin}
              />
              <Route path="/" render={() => <Redirect to="/home" />} />
            </Switch>
          </main>
        </div>
      ) : !authenticated && pageLoaded ? (
        <>
        <Route path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        </>
      ) : (
        <div className={classes.loader}>
          <Loader type="BallTriangle" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default Layout;
