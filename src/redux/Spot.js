import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'spot',
  initialState: {
    name: '',
    address: '',
    intro: '',
    mainImage: '',
    image: '',
  },
  reducers: {
    POST: (state, action) => {
      state.address = action.payload.address;
    },
  },
});

export const { POST } = userSlice.actions;
export default userSlice.reducer;
