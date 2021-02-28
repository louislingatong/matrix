import React from 'react';
import {useSelector} from 'react-redux';
import ScrollTop from '../components/scroll-top/ScrollTop';
import PrivateLayout from './Private';
import PublicLayout from './Public';
import {loggedInStatus} from '../store/authSlice';
import {useLocation} from 'react-router-dom'
import _ from 'lodash';

function Layout({children, ...rest}) {
  const location = useLocation();
  const isAuthenticated = useSelector(loggedInStatus);

  const fixedHeader = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'
  ];

  return (
    <React.Fragment>
      <ScrollTop/>
      {
        isAuthenticated
          ? <PrivateLayout {...rest} isFixedHeader={_.includes(fixedHeader, location.pathname)}>{children}</PrivateLayout>
          : <PublicLayout {...rest} isFixedHeader={_.includes(fixedHeader, location.pathname)}>{children}</PublicLayout>
      }
    </React.Fragment>
  );
}

export default Layout;
