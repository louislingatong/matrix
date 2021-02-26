import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import authReducer from '../modules/auth/authSlice';

export default configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer
  },
});
