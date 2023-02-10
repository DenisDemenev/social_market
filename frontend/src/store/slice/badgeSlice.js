import { createSlice } from '@reduxjs/toolkit';

const badgeSlice = createSlice({
  name: 'badge',
  initialState: {
    badge: 0,
  },
  reducers: {
    badgeValue(state, action) {
      state.badge = action.payload;
    },
  },
});

export const { badgeValue } = badgeSlice.actions;
export default badgeSlice.reducer;
