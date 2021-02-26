import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  }
});

export const {setLoading} = loaderSlice.actions;

export const loaderStatus = state => state.auth.isLoading;

export default loaderSlice.reducer;
