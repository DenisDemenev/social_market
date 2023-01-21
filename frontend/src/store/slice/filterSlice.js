import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    subject: '',
    search: '',
    sort: '',
    label: false,
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
    labelValue(state, action) {
      state.label = action.payload;
    },
  },
});

export const { subjectValue, searchValue, sortValue, labelValue } =
  filterSlice.actions;
export default filterSlice.reducer;
