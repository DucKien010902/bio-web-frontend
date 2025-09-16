// noticeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unreadCount: null, // ban đầu null
};

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload; // cập nhật số lượng chưa xem
    },
    clearUnreadCount: (state) => {
      state.unreadCount = 0; // reset về 0
    },
  },
});

export const { setUnreadCount, clearUnreadCount } = noticeSlice.actions;
export default noticeSlice.reducer;
