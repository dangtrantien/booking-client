import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/user-slice';
import hotelReducer from './hotel/hotel-slice';

// ==================================================

const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
  },
});

export default store;
