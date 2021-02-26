import {lazy} from 'react'

export default [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: lazy(() => import('./pages/Login')),
  },
  {
    name: 'Register',
    path: '/register',
    exact: true,
    component: lazy(() => import('./pages/Register')),
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    exact: true,
    component: lazy(() => import('./pages/ForgotPassword')),
  },
  {
    name: 'Reset Password',
    path: '/reset-password/:token',
    exact: true,
    component: lazy(() => import('./pages/ResetPassword')),
  }
]