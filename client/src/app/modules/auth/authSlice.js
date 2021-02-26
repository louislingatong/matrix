import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  }
});

export const {authenticate} = authSlice.actions;

export const authLogin = (token) => dispatch => {
  localStorage.setItem('auth_token', token)
  dispatch(authenticate(true));
};

export const authCheck = () => dispatch => {
  dispatch(authenticate(!!localStorage.getItem('auth_token')))
};

export const authLogout = () => dispatch => {
  localStorage.removeItem('auth_token')
  dispatch(authenticate(false));
};

export const loggedInStatus = state => state.auth.isAuthenticated;

export default authSlice.reducer;
