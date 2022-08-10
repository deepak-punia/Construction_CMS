import {API_ENDPOINT} from './types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: true,
	data: null,
    error: null,
};

export const loadData = createAsyncThunk('api/loadData', async () => {
    
    const response = await axios.get(
        `${API_ENDPOINT}/api/customizations/`
    );
    return response.data;
  });


  
  export const customSettings = createSlice({
    name: 'customSettings',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(loadData.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(loadData.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(loadData.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
          state.error= action.payload;
          console.log('error in Getting settings');
        });
    },
  });
  
  
  export default customSettings.reducer;