import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import paginatorReducer from './paginatorSlice';
import { authReducer } from './authSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    paginator: paginatorReducer,
    auth: authReducer,
  },
});
