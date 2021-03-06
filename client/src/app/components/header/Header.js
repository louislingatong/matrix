import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, loggedInStatus} from '../../store/authSlice';
import {Link, useLocation} from 'react-router-dom';
import _ from 'lodash';
import {Nav, Navbar} from 'react-bootstrap';
import logo from '../../../assets/images/logo_w.png';

Header.propTypes = {
  isFixedHeader: PropTypes.bool.isRequired,
  children: PropTypes.any
};

function Header({isFixedHeader}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(loggedInStatus);

  const handleLogout = () => {
    dispatch(authLogout());
  };

  const hideToggleButton = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'
  ];

  const hideLoginButton = [
    '/register',
    '/forgot-password',
    '/reset-password'
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg"
            className={isFixedHeader && 'fixed-header'}>
      <Navbar.Brand to={'/'} as={Link}>
        <img
          src={logo}
          className="d-inline-block align-top"
          alt="Matrix logo"
        />
      </Navbar.Brand>
      {
        _.isEmpty(_.filter(hideToggleButton, path => _.includes(location.pathname, path))) &&
        <Navbar.Toggle aria-controls="navbar-nav" />
      }
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          {
            isAuthenticated && (
              <React.Fragment>
                <Nav.Link active={location.pathname === '/'}
                          to={{pathname: '/', state: {from: location.pathname}}}
                          as={Link}>Dashboard</Nav.Link>
                <Nav.Link active={location.pathname === '/users'}
                          to={{pathname: '/users', state: {from: location.pathname}}}
                          as={Link}>Users</Nav.Link>
                <Nav.Link active={location.pathname === '/profile'}
                          to={{pathname: '/profile', state: {from: location.pathname}}}
                          as={Link}>Profile</Nav.Link>
              </React.Fragment>
            )
          }
        </Nav>
        <Nav>
          {
            isAuthenticated ?
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link> :
              !_.isEmpty(_.filter(hideLoginButton, path => _.includes(location.pathname, path))) &&
                <Nav.Link to={'/login'} as={Link}>Login</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;