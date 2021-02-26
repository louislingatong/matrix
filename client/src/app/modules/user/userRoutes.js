import {lazy} from 'react'

export default [
  {
    name: 'Users',
    path: '/users',
    exact: true,
    auth: true,
    component: lazy(() => import('./pages'))
  },
]