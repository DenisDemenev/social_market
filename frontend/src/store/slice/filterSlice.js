import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    category: '',
    search: '',
    sort: '',
    priceMin: '',
    priceMax: '',
    label: false,
  },
  reducers: {
    categoryValue(state, action) {
      state.category = action.payload;
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
  categoryValue,
  searchValue,
  sortValue,
  labelValue,
  priceMaxValue,
  priceMinValue,
} = filterSlice.actions;
export default filterSlice.reducer;
