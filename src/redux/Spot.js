import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'spot',
  initialState: {
    spotname: '',
    address: '',
    intro: '',
    mainImage: '',
    image: '',
  },
  reducers: {
    POST: (state, action) => {
      state.address = action.payload.address;
    },
    SET_SPOT: (state, action) => {
      state.spotname = action.payload.spotname;
      state.address = action.payload.address;
      state.intro = action.payload.intro;
    },
  },
});

export const { POST, SET_SPOT } = userSlice.actions;
export default userSlice.reducer;
