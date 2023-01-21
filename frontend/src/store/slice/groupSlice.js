import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchGroupsVk = createAsyncThunk(
  'posts/fetchGroupsVk',
  async ({
    pageCurrent = 1,
    limit = 50,
    subjectValue,
    searchValue,
    sortValue,
    isLabel,
  }) => {
    const { data } = await axios.get(
      `groups/?page=${pageCurrent}&limit=${limit}${
        subjectValue ? `&subject__slug=${subjectValue}` : ''
      }${isLabel ? `&label=true` : ''}${
        searchValue ? `&search=${searchValue}` : ''
      }${sortValue ? `&ordering=${sortValue}` : ''}`
    );
    return data;
  }
);

const initialState = {
  groupsVk: {
    items: {},
    status: 'loading',
  },
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchGroupsVk.pending]: (state) => {
      state.groupsVk.items = {};
      state.groupsVk.status = 'loading';
    },
    [fetchGroupsVk.fulfilled]: (state, action) => {
      state.groupsVk.items = action.payload;
      state.groupsVk.status = 'loaded';
    },
    [fetchGroupsVk.rejected]: (state) => {
      state.groupsVk.items = {};
      state.groupsVk.status = 'error';
    },
  },
});

export const groupsReducers = groupsSlice.reducer;
