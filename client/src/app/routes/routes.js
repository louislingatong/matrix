import homeRoutes from '../modules/dashboard/dashboardRoutes';
import authRoutes from '../modules/auth/authRoutes';

export default [
  ...homeRoutes,
  ...authRoutes,
  {
    path: '*',
    notFound: true,
  }
];
