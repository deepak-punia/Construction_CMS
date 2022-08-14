import { API_ENDPOINT } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import Appointment from "../components/user/Appointment";

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
			});
	},
});

export default appointments.reducer;
