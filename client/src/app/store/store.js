import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import authReducer from '../modules/auth/authSlice';
import userReducer from '../modules/user/userSlice';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    user: userReducer
  },
});
