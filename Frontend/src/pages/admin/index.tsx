import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EditTranslations from './EditTranslations';
import EditWords from './EditWords';
import TranslationDetailsModal from './EditTranslations/TranslationDetailsModal';

const Admin = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path + '/edit-translations'} exact component={EditTranslations} />
      <Route path={path + '/edit-words'} exact component={EditWords} />
    </Switch>
  );
};

export default Admin;

