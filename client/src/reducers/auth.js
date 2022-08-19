import {API_ENDPOINT} from './types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
  error: null
};

export const login = createAsyncThunk('api/login', async ({ email, password }) => {
    const body = JSON.stringify({  email, password });
    const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
    const response = await axios.post(
        `${API_ENDPOINT}/api/users/login`,
        body,
        config
    );
    return response.data;
  });

  export const register = createAsyncThunk('api/register', async ({ name,email,phone, password }) => {
    const body = JSON.stringify({  name,email,phone, password });
    const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
    const response = await axios.post(
        `${API_ENDPOINT}/api/users/register`,
        body,
        config
    );
    return response.data;
  });

export const loadUser = createAsyncThunk('api/loadUser', async () => {
  if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
    const response = await axios.get(
        `${API_ENDPOINT}/api/users/user`
        
    );
    return response.data;
  });


  
  export const auth = createSlice({
    name: 'login',
    initialState,
    reducers: {
      logout(state, action){
        localStorage.removeItem("token");
        return {
          ...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
        };
        
    },
    },
    extraReducers(builder) {
      builder
        .addCase(login.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated=true;
          localStorage.setItem("token", action.payload.token);
          
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated=false;
          state.error= action.payload;
          console.log('error in Login');
        })
        .addCase(register.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated=true;
          localStorage.setItem("token", action.payload.token);
          
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated=false;
          state.error= action.payload;
          console.log('error in register');
        })
        .addCase(loadUser.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated=true;
          state.user = action.payload;
        })
        .addCase(loadUser.rejected, (state, action) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated=false;
          state.error= action.payload;
          console.log('error in Loading User data.');
        });
    },
  });
  
  export const { logout} = auth.actions;
  export default auth.reducer;