import userReducer from './User';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
