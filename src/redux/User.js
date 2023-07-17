import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    nickname: '',
    intro: '',
    image: 'https://mandarin.api.weniv.co.kr/Ellipse.png',
  },
  reducers: {
    SET_USER: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.nickname = action.payload.nickname;
      state.intro = action.payload.intro;
    },
    loginUser: (state, action) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.intro = action.payload.intro;
    },

    logoutUser: (state) => {
      state.email = '';
      state.nickname = '';
      state.intro = '';
    },
  },
});

export const { SET_USER, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
