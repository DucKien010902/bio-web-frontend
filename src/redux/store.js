import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import countNoticesReducer from './slices/countNoticesSlice';
import openMenuReducer from './slices/openMenuSlice';
const store = configureStore({
  reducer: {
    chat: chatReducer,
    openMenu: openMenuReducer,
    countNotices: countNoticesReducer,
  },
});

export default store;
