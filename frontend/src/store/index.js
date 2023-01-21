import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slice/filterSlice';
import paginatorReducer from './slice/paginatorSlice';
import { authReducer } from './slice/authSlice';
import { groupsReducers } from './slice/groupSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    paginator: paginatorReducer,
    auth: authReducer,
    groups: groupsReducers,
  },
});
