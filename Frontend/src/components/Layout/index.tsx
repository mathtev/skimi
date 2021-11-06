import { makeStyles } from '@material-ui/core';
import React from 'react';
import { cssVariables } from '../../context/theme/theme';
import Header from '../Header';
import Sidebar from '../Sidebar';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Home from '../../pages/Home';
import Admin from '../../pages/admin';
import { useAuth } from '../../hooks/useAuth';
import Login from '../../pages/Login';
import { PrivateRoute } from '../PrivateRoute';
import Loader from 'react-loader-spinner';

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
  const { currentUser, authLoading, authenticated, login, logout } = useAuth();

  console.log(currentUser);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const pageLoaded = !authLoading;
  console.log(authenticated, currentUser);

  return (
    <div className={classes.root}>
      {pageLoaded ? (
        <div>
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className={classes.content}>
            <button onClick={() => login('test@mail.com', 'qwerty123')}>
              login
            </button>
            <button onClick={() => logout()}>logout</button>
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/home" />} />
              <PrivateRoute
                path="/home"
                exact
                authenticated={authenticated}
                component={Home}
              />
              <PrivateRoute
                path="/admin"
                authenticated={authenticated}
                component={Admin}
              />
            </Switch>
          </main>
          <Route path="/login" exact component={Login} />
        </div>
      ) : (
        <div className={classes.loader}>
          <Loader type="BallTriangle" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default Layout;
