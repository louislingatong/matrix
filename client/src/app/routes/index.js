import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import Layout from '../layout';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import routes from './routes';
import {authCheck, loggedInStatus, loggedInUser} from '../store/authSlice';
import {me} from '../services/authService';

function Routes() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loggedInStatus);
  const profile = useSelector(loggedInUser);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(authCheck());
    }

    if (isAuthenticated && _.isEmpty(profile)) {
      dispatch(me())
    }
  }, [isAuthenticated, profile]);

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
