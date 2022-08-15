import { API_ENDPOINT } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


const initialState = {
	loading: true,
	error: null,
	allapt: null,
	userapt: null,
};

export const getallapt = createAsyncThunk("api/getallapt", async () => {
	const response = await axios.get(`${API_ENDPOINT}/api/appointments/`);
	return response.data;
});

export const getuserapt = createAsyncThunk("api/getuserapt", async ({ id }) => {
	const response = await axios.get(`${API_ENDPOINT}/api/appointments/${id}`);
	return response.data;
});

export const adduserapt = createAsyncThunk("api/adduserapt", async ({ apt_time, apt_date}) => {
	const body = JSON.stringify({  apt_time, apt_date});
    const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
    const response = await axios.post(
        `${API_ENDPOINT}/api/appointments/`,
        body,
        config
    );


	return response.data;
});

export const deleteapt = createAsyncThunk("api/deleteuserapt", async ({ id}) => {
	
    const response = await axios.post(
        `${API_ENDPOINT}/api/appointments/one/${id}`
        
    );


	return response.data;
});


export const appointments = createSlice({
	name: "appointments",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getallapt.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getallapt.fulfilled, (state, action) => {
				state.loading = false;
				state.allapt = action.payload;
			})
			.addCase(getallapt.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				console.log("error in getting Appointments data.");
			})
			.addCase(getuserapt.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getuserapt.fulfilled, (state, action) => {
				state.loading = false;
				state.userapt = action.payload;
			})
			.addCase(getuserapt.rejected, (state, action) => {
				state.loading = false;
				state.userapt = null;
				state.error = action.payload;
				console.log("error in Loading User appointments data.");
			})
			.addCase(adduserapt.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(adduserapt.fulfilled, (state, action) => {
				state.loading = false;
				state.userapt = action.payload;
			})
			.addCase(adduserapt.rejected, (state, action) => {
				state.loading = false;
				state.userapt = null;
				state.error = action.payload;
				console.log("error in Adding User appointments data.");
			})
			.addCase(deleteapt.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteapt.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deleteapt.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				console.log("error in -> Delete appointment.");
			});
	},
});

export default appointments.reducer;
