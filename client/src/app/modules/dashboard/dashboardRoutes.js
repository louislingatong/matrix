import {lazy} from 'react'

export default [
  {
    name: 'Home',
    path: '/',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages/Dashboard')),
  },
]