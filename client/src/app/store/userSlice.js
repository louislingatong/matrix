import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  data: {}
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload;
    },
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const {setUserList, setUserData} = userSlice.actions;

export const users = state => state.user.list;
export const user = state => state.user.data;

export default userSlice.reducer;
