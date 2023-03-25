import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/me/');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/', {
        email,
        password,
        username: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.request.responseText);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/token/login/', {
        email,
        password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.request.responseText);
    }
  }
);

const initialState = {
  user: null,
  registerData: null,
  loginData: null,
  status: 'loading',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [getMe.pending]: (state) => {
      state.status = 'loading';
      state.user = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.user = action.payload;
    },
    [getMe.rejected]: (state) => {
      state.status = 'error';
      state.user = null;
    },
    [registerUser.pending]: (state) => {
      state.status = 'loading';
      state.registerData = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.registerData = action.payload;
    },
    [registerUser.rejected]: (state) => {
      state.registerData = null;
      state.status = 'error';
    },
    [loginUser.pending]: (state) => {
      state.status = 'loading';
      state.loginData = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.loginData = action.payload;
    },
    [loginUser.rejected]: (state) => {
      state.loginData = null;
      state.status = 'error';
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
