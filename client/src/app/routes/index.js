import React from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import Layout from '../layout';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import routes from './routes';
import {loggedInStatus} from '../modules/auth/authSlice';
import {useSelector} from 'react-redux';

function Routes() {
  const isAuthenticated = useSelector(loggedInStatus);

  return (
    <Router>
      <Layout>
        <Switch>
          {
            routes.map((route, i) => {
              if (route.notFound) {
                return <Redirect key={i} to={{pathname: '/login'}}/>
              }
              if (route.auth) {
                return <PrivateRoute key={i} isAuthenticated={isAuthenticated} {...route} />
              }
              return <PublicRoute key={i} isAuthenticated={isAuthenticated} {...route} />
            })
          }
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;
