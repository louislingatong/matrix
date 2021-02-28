import {lazy} from 'react'

export default [
  {
    name: 'Dashboard',
    path: '/',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/dashboard')),
  },
  {
    name: 'Profile',
    path: '/profile',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/profile')),
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: lazy(() => import('../views/auth/Login')),
  },
  {
    name: 'Register',
    path: '/register',
    exact: true,
    component: lazy(() => import('../views/auth/Register')),
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    exact: true,
    component: lazy(() => import('../views/auth/ForgotPassword')),
  },
  {
    name: 'Reset Password',
    path: '/reset-password/:token',
    exact: true,
    component: lazy(() => import('../views/auth/ResetPassword')),
  },
  {
    name: 'Users',
    path: '/users',
    exact: true,
    auth: true,
    component: lazy(() => import('../views/user'))
  },
  {
    path: '*',
    notFound: true,
  }
];
