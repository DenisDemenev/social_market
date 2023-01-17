import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import paginatorReducer from './paginatorSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    paginator: paginatorReducer,
  },
});
