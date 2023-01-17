import { createSlice } from '@reduxjs/toolkit';

const paginatorSlice = createSlice({
  name: 'paginator',
  initialState: {
    pageCount: 0,
    pageCurrent: 1,
  },
  reducers: {
    pageCountValue(state, action) {
      state.pageCount = action.payload;
    },
    pageCurrentValue(state, action) {
      state.pageCurrent = action.payload;
    },
  },
});

export const { pageCountValue, pageCurrentValue } = paginatorSlice.actions;
export default paginatorSlice.reducer;
