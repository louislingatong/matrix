import dashboardRoute from '../modules/dashboard/dashboardRoute';
import authRoutes from '../modules/auth/authRoutes';
import userRoutes from '../modules/user/userRoutes';

export default [
  ...dashboardRoute,
  ...authRoutes,
  ...userRoutes,
  {
    path: '*',
    notFound: true,
  }
];
