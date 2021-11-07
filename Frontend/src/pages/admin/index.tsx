import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EditWords from './EditWords';

const Admin = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path + '/edit-words'} exact component={EditWords} />
    </Switch>
  );
};

export default Admin;

