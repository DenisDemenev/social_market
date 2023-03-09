import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    subject: '',
    search: '',
    sort: '',
    priceMin: 0,
    priceMax: 10000,
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
    priceMinValue(state, action) {
      state.priceMin = action.payload;
    },
    priceMaxValue(state, action) {
      state.priceMax = action.payload;
    },
  },
});

export const {
  subjectValue,
  searchValue,
  sortValue,
  labelValue,
  priceMaxValue,
  priceMinValue,
} = filterSlice.actions;
export default filterSlice.reducer;
