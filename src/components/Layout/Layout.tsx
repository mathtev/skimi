import classes from '*.module.css';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { cssVariables } from '../../theme/theme';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
  },
  content: {
    paddingTop: cssVariables.headerHeight,
    paddingLeft: cssVariables.sidebarCloseWidth,
  }
}));

const Layout = () => {
  const classes = useStyles();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={classes.root}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className={classes.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos beatae odit
        sed eum, deserunt laboriosam nulla alias incidunt ab aperiam amet iusto
        ad exercitationem vero nisi in distinctio cumque non omnis. Harum
        expedita vero esse eos sunt earum assumenda rerum aperiam magni ad vel
        repellat atque porro inventore, illo iusto ipsam aspernatur non sint
        aliquam eius quo dolor itaque. Architecto libero dolor dignissimos,
        iusto exercitationem, maxime neque incidunt laboriosam quaerat expedita
        a cupiditate qui. Et, sit excepturi, possimus accusamus, veniam
        voluptate voluptatum architecto quisquam necessitatibus totam quas
        repellat temporibus molestiae ipsam nobis? Vitae iste deleniti
        perspiciatis id asperiores veniam tempora?
      </main>
    </div>
  );
};

export default Layout;
