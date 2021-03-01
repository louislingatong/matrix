import React, {useEffect} from 'react';
import {Router as ReactRouter, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Layout from '../layout';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import routes from './routes';

const history = createBrowserHistory();

function Routes() {
  return (
    <ReactRouter history={history}>
      <Layout>
        <Switch>
          {
            routes.map((route, i) => {
              if (route.notFound) {
                return <Redirect key={i} to={{pathname: '/login'}}/>
              }
              if (route.auth) {
                return <PrivateRoute key={i} {...route} />
              }
              return <PublicRoute key={i} {...route} />
            })
          }
        </Switch>
      </Layout>
    </ReactRouter>
  );
}

export default Routes;
