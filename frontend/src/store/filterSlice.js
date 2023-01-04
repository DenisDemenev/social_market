import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    subject: '',
    search: '',
    sort: '',
  },
  reducers: {
    subjectValue(state, action) {
      state.subject = action.payload;
    },
    searchValue(state, action) {
      state.search = action.payload;
    },
    sortValue(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { subjectValue, searchValue, sortValue } = filterSlice.actions;
export default filterSlice.reducer;
