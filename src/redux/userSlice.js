import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')) || null;

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: userInfoFromStorage },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
