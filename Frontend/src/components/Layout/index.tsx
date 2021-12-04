import { makeStyles } from '@material-ui/core';
import React from 'react';
import { cssVariables } from '../../context/theme/theme';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Admin from '../../pages/Admin';
import { useAuth } from '../../hooks/useAuth';
import Login from '../../pages/Login';
import { PrivateRoute } from '../PrivateRoute';
import Loader from 'react-loader-spinner';
import YourSets from '../../pages/YourSets';
import LearnMode from '../../pages/LearnMode';
import SetDetails from '../../pages/YourSets/SetDetails';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    inset: 0,
    height: '100%',
  },
  layout: {
    height: '100%',
  },
  loader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: '100%',
    paddingTop: `calc(${cssVariables.headerHeight + theme.spacing(6)}px)`,
    paddingBottom: theme.spacing(6),
  },
}));

const Layout = () => {
  const classes = useStyles();
  const { authLoading, authenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const pageLoaded = !authLoading;

  return (
    <div className={classes.root}>
      {pageLoaded && authenticated ? (
        <div className={classes.layout}>
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className={classes.content}>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/your-sets" exact component={YourSets} />
              <Route path="/learn/:id" exact component={LearnMode} />
              <Route path="/your-sets/:id" component={SetDetails} />
              <Route path="/admin" component={Admin} />
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
