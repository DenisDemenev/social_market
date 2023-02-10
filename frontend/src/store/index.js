import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slice/filterSlice';
import paginatorReducer from './slice/paginatorSlice';
import { authReducer } from './slice/authSlice';
import badgeReducer from './slice/badgeSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    badge: badgeReducer,
    paginator: paginatorReducer,
    auth: authReducer,
  },
});
