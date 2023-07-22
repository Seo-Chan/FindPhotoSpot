import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User';
import spotReducer from './Spot';

export default configureStore({
  reducer: {
    user: userReducer,
    spot: spotReducer,
  },
});
