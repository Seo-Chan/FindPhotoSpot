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

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
