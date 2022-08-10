import {API_ENDPOINT} from './types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
    error: null,
};

export const login = createAsyncThunk('api/login', async ({ email, password }) => {
    const body = JSON.stringify({  email, password });
    const response = await axios.post(
        `${API_ENDPOINT}/api/users/login`,
        body
    );
    return response.data;
  });


  
  export const auth = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(login.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated=true;
          localStorage.setItem("token", action.payload.token);
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated=false;
          state.error= action.payload;
          console.log('error in Login');
        });
    },
  });
  
  
  export default auth.reducer;